import React, { useEffect, useState } from 'react';
import { Alert, Modal, ModalHeader, ModalBody, Spinner, Badge, ModalFooter, Row, Col, Container } from 'reactstrap';

import { getVideoById } from '../../services/ytapi.service'

const VideoBox = (props) => {
    const { trigger, video = {} } = props;
    const { contentDetails, snippet } = video;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [loading, setLoading] = useState(true)
    const [videoData, setVideoData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const videoData = await getVideoById(contentDetails.videoId)
            setVideoData(videoData.items[0])
            console.log(videoData)
            setLoading(false)
        }
        if (modal && contentDetails) {
            fetchData()
        }
    }, [contentDetails, modal])

    return (
        <>
            <span onClick={toggle}>{trigger}</span>
            <Modal isOpen={modal} toggle={toggle} size="xl">
                <ModalHeader toggle={toggle}>{snippet?.title}</ModalHeader>
                <ModalBody>
                    <div className="d-flex" style={{ minHeight: 500 }}>
                        <div className="m-auto">
                            {loading &&
                                <Spinner color="primary" />
                            }
                            {videoData &&
                                <div dangerouslySetInnerHTML={{ __html: videoData.player.embedHtml }}></div>
                            }
                            {!loading && !videoData &&
                                <Alert>Unable to play video. </Alert>
                            }
                        </div>
                    </div>
                </ModalBody>
                {videoData &&
                    <ModalFooter>
                        <div className="d-flex">
                            <div className="mx-3">
                                Views <Badge color="primary"> {videoData.statistics.viewCount} </Badge>
                            </div>
                            |
                            <div className="mx-3">
                                Likes <Badge color="primary"> {videoData.statistics.likeCount} </Badge>
                            </div>
                            |
                            <div className="mx-3">
                                Dislikes <Badge color="primary"> {videoData.statistics.dislikeCount} </Badge>
                            </div>
                            |
                            <div className="ml-3">
                                Favorites <Badge color="primary"> {videoData.statistics.favoriteCount} </Badge>
                            </div>
                        </div>
                    </ModalFooter>
                }
            </Modal>
        </>
    );
}

export default VideoBox;