import React from 'react';
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
} from 'reactstrap';
import VideoBox from './VideoBox'
import { getThumbUrl } from '../../utils/utils'

const VideoInfo = ({ video }) => {

    const { snippet } = video

    return (
        <VideoBox video={video} trigger={(
            <Card className="selectable h-100">
                <CardImg top style={{ width: '100%' }} src={getThumbUrl(snippet.thumbnails)} alt="Card image cap" />
                <CardBody>
                    <CardTitle tag="h5">{snippet.title}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted"><small>{snippet.description}</small></CardSubtitle>
                </CardBody>
                <div className="card-footer bg-transparent"><small><i>Published on {snippet.publishedAt}</i></small></div>
            </Card>
        )} />
    );
};

export default VideoInfo;
