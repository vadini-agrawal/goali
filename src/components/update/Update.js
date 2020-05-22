import React, { Component } from 'react'
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import Link from 'react-router-dom/Link';

//Bootstrap stuff 
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyButton from '../../util/MyButton';
import DeleteUpdate from './DeleteUpdate';
import UpdateDialog from './UpdateDialog';
import LikeButton from './LikeButton';
import Comments from './Comments';

//import likeButton from ''
//Icons 
import ChatIcon from 'react-bootstrap-icons/dist/icons/chat-dots-fill';

//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CardStyle = styled.section`
  margin-bottom: 10px;
  .card {
      padding: 15px;
  }
  .icon {
      height: 20px;
      margin: 10px;
  }
  .title {
      font-size: 20px;
  }
  .title:hover {
      text-decoration: underline;
  }
  .date {
      font-size: 15px;
  }
  .body {
      font-size: 18px;
  }
  .goalType {
      margin-top; 30px;
      font-size: 16px;
      padding: 8px;
  }
  .update {
      margin: 10px;
  }
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
                <Card className="card">
                    <Card.Body>
                        <Row>
                            <Col xs={3} sm={3} md={3} lg={3}>
                                <Card.Img width="50px" src={userImage} title="Profile Image"/>
                            </Col>
                            <Col xs={9} sm={9} md={9} lg={9}>
                                <Card.Title>
                                    <Card.Link href={`/users/${userHandle}`}> 
                                      <span className="title">  {userHandle}</span><span className='date'>  {dayjs(createdAt).fromNow()} </span>
                                    </Card.Link>
                                </Card.Title>
                                <span className="body"> {body} </span>
                                { deleteButton }
                                <Card.Text className="goalType">
                                    {goalType}
                                </Card.Text>
                                <Card.Text className="likes">
                                    <LikeButton className="icon" updateId = { updateId}/>
                                    <span> {likeCount}   Likes  </span>  
                                    <MyButton tip="Comment">
                                        <ChatIcon className="icon" />
                                    </MyButton>
                                    {commentCount} Comments
                                    <UpdateDialog className="update" updateId = { updateId } userHandle={ userHandle } openDialog={this.props.openDialog} /> 
                                </Card.Text>
                            </Col>
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
    classes: PropTypes.object,
    openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(Update);
