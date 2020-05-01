import React, { Component } from 'react'
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { LinkContainer} from 'react-router-bootstrap';
// import Link from 'react-router-dom/Link';

//Bootstrap stuff 
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyButton from '../../util/MyButton';
import DeleteUpdate from './DeleteUpdate';
import UpdateDialog from './UpdateDialog';
import LikeButton from './LikeButton';

//import likeButton from ''
//Icons 
import ChatIcon from 'react-bootstrap-icons/dist/icons/chat-dots-fill';

//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CardStyle = styled.section`
  margin-bottom: 10px;
`;

const IconStyle = styled.svg`
  margin: 0;
  margin-left: 10px;
`;
// const ContainerSpecial = styled.img`
//   border-radius: 50%;
// `;

class Update extends Component {

    render() {
        dayjs.extend(relativeTime);
        const { 
            classes, 
            update: { 
                body, 
                createdAt, 
                userImage, 
                goalType, 
                userHandle, 
                updateId, 
                likeCount, 
                commentCount
            },
            user: { 
                authenticated, 
                credentials: {
                    handle
                }
            }
        } = this.props;
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteUpdate updateId={updateId}/>
        ) : null
        return (
            <CardStyle>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col xs={3} sm={3} md={3} lg={3}>
                                <Card.Img width="50px" src={userImage} title="Profile Image"/>
                            </Col>
                            <Col xs={9} sm={9} md={9} lg={9}>
                                <Card.Title>
                                    <Card.Link href={`/users/${userHandle}`}> 
                                        {userHandle}
                                    </Card.Link>
                                </Card.Title>
                                    <Card.Text>
                                        {dayjs(createdAt).fromNow()} <br></br>
                                        {body}
                                    </Card.Text>
                                { deleteButton }
                            </Col>
                        </Row>
                        <br>
                        </br>
                        <Row>
                            <Col xs={3} sm={3} md={3} lg={3}>
                
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={4}>
                                <Card.Text>
                                    {goalType}
 
                                </Card.Text>
                            </Col>
                            <Col xs={5} sm={5} md={5} lg={5}>
                                <LikeButton updateId = { updateId}/>
                                {likeCount} Likes    
                                <MyButton tip="Comment">
                                    <ChatIcon />
                                </MyButton>
                                    {commentCount} Comments
                            </Col>
                        </Row>
                        <Row>
                            <UpdateDialog updateId = { updateId } userHandle={ userHandle } /> 
                        </Row>
                    </Card.Body>
                </Card>
            </CardStyle>
        )
    }
}

Update.propTypes = {
    user: PropTypes.object.isRequired,
    update: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(Update);
