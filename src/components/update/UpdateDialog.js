import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';
//Icons 
import UnfoldIcon from 'react-bootstrap-icons/dist/icons/arrow-bar-down';
import MyButton from '../../util/MyButton';
import ChatIcon from 'react-bootstrap-icons/dist/icons/chat-dots-fill';

//Redux 
import { connect } from 'react-redux';
import { getUpdate } from '../../redux/actions/dataActions';
//UI 
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { LinkContainer } from 'react-router-bootstrap';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';


const Styled = styled.section`
    display: inline-block;
    margin: 10px;
    .invisibleSeparator {
        border: none;
        margin: 4;
    }
    .proPic {
        objectFit: cover;
    }
    .spinner {
        text-align: center;
    }
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
    .col-image {
        display: flex;
    }
    .image {
        margin: auto;
        text-align: center;
    }
    .modal-header {
        height: 0px;
        border: none;
    }
    .loading {
        height: 80vh;
    }
`;

const StyledSpin = styled.section`
    text-align: center;
`;

class UpdateDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    };
    componentDidMount() {
        if(this.props.openDialog) {
            this.handleOpen();
        }
    }
    handleOpen = () => {
        let oldPath = window.location.pathname;
        const { userHandle, updateId } = this.props;
        const newPath = `/users/${userHandle}/update/${updateId}`;
        window.history.pushState(null, null, newPath);
        
        if (oldPath === newPath) {
            oldPath = `/users/${userHandle}`;
        }

        this.setState({ open: true, oldPath, newPath });
        this.props.getUpdate(this.props.updateId);
    }
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);

        this.setState({ open: false });
    }
    render() {
        const { 
            classes, 
            update: { 
                updateId,
                body,
                goalType, 
                createdAt, 
                likeCount, 
                commentCount, 
                userImage, 
                userHandle, 
                comments
            },
            UI: { loading }
        } = this.props;
       
        return (
            <Fragment>
                <Styled>
                <MyButton tip='Expand update'>
                    <UnfoldIcon onClick={ this.handleOpen } />
                </MyButton>
                <Modal size="lg" show={ this.state.open  } onHide={ this.handleClose } width="80%" style={{'width': '80% !important',  'padding': '10px'}}>
                    { loading ? (
                        <StyledSpin>
                        <Modal.Body className="loading">
                            <Spinner className="spinner" as="span"
                            animation="border"
                            size="lg"
                            role="status"
                            aria-hidden="true"/>
                        </Modal.Body>
                        </StyledSpin>
                    ) : (
                        <Styled>
                        <Modal.Body style={{'maxHeight': 'calc(100vh - 50px)', 'overflowY': 'auto'}} >
                        <Modal.Header className="modal-header" closeButton></Modal.Header>
                            <Row>
                                <Col xs={3} sm={3} md={3} lg={3} className="col-image">
                                    <Image width="80%" src={userImage} title="Profile Image" className="image" roundedCircle/>
                                </Col>
                                <Col xs={9} sm={9} md={9} lg={9}>
                                    <p>
                                        <a href={`/users/${userHandle}`}> 
                                        <span className="title"> @{userHandle}</span><span className='date'>  {dayjs(createdAt).fromNow()} </span>
                                        </a>
                                    </p>
                                    <span className="body"> {body} </span>
                    
                                    <p className="goalType">
                                        {goalType}
                                    </p>
                                    <p className="likes">
                                        <LikeButton className="icon" updateId = { updateId}/>
                                        <span> { likeCount} {(likeCount) === 1 ? "Like" : "Likes"} </span>  
                                        <MyButton tip="Comment">
                                            <ChatIcon className="icon" />
                                        </MyButton>
                                        {commentCount} Comments
                                    </p>
                                </Col>
                            </Row>
                                <Row>
                                    <br/>
                                    <hr />
                                    <CommentForm updateId = {updateId}/>
                                    <Comments comments={ comments } />
                                </Row>
                        </Modal.Body>
                        </Styled>
                    )}
                </Modal>
                </Styled>
            </Fragment>
        );
    }


}

UpdateDialog.propTypes = {
    getUpdate: PropTypes.func.isRequired,
    updateId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    update: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func
}

const mapStateToProps = state =>({
    update: state.data.update,
    UI: state.UI 
});

export default connect(mapStateToProps, { getUpdate  })(UpdateDialog)
