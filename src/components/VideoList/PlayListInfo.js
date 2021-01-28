import {
    Row, Col,
    //CardImg
    Badge,
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Container
} from 'reactstrap';

//import { getThumbUrl } from '../../utils/utils'

export default function PlayListInfo({ playlist }) {
    const { snippet, contentDetails } = playlist
    //const image = getThumbUrl(snippet.thumbnails)
    return (
        <div>
            <Card>
                <Container>
                    <Row className="text-center">
                        {/* image &&
                            <Col className="card-body">
                                <CardImg top style={{ height: 125, width: 'auto' }} src={image} alt={snippet.title} />
                            </Col> */
                        }
                        <Col size="auto">
                            <CardBody>
                                <CardTitle tag="h5">
                                    {snippet.title}
                                </CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">
                                    <Badge color="secondary">{contentDetails.itemCount} video{contentDetails.itemCount > 1 && 's'}</Badge>
                                </CardSubtitle>
                                {<CardText>{snippet.description}</CardText>}
                                <CardText><small><i>Published on {snippet.publishedAt}</i></small></CardText>
                            </CardBody>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </div>
    );
}