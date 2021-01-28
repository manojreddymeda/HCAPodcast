import { useEffect, useState } from 'react'

import { Alert, Spinner, Col } from 'reactstrap';

import { listVideosByPlayList } from '../../services/ytapi.service'

import PlayListInfo from './PlayListInfo'
import VideoInfo from './VideoInfo';

export default function VideoList({ filter, search }) {
    const [loading, setLoading] = useState(true)
    const [videoList, setVideoList] = useState([])
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const list = await listVideosByPlayList(filter.id)
                setVideoList(list.items)
                setLoading(false)
            }
            catch (e) {
                setError(true)
                setLoading(false)
            }
        }

        if (filter) {
            fetchData()
        }
    }, [filter])

    if (loading) {
        return (<Spinner color="primary" />)
    }

    if (error) {
        return (
            <Alert color="danger">
                There was an error while fetching the data. Pleas try after sometime.
            </Alert>
        )
    }

    const filteredVideos = search ? videoList.filter(v => (v.snippet.title.toLocaleLowerCase()).indexOf(search.toLocaleLowerCase()) > -1) : videoList

    return (
        <>
            <div className="position-relative col-3">
                <div className="sticky-top" style={{ zIndex: 0 }}> <PlayListInfo playlist={filter} /></div>
            </div>
            <Col>
                <div className="row row-cols-1 row-cols-md-3">

                    {filteredVideos.length ? filteredVideos.map(video => (
                        <Col key={video.id} className="mb-4">
                            <VideoInfo video={video} />
                        </Col>
                    )) :
                        <Col className="mx-auto mt-5">
                            <Alert color="info">No videos found matching your search</Alert>
                        </Col>
                    }
                </div>
            </Col>
        </>

    )
}