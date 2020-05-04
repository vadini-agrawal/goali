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
import { getUpdate,clearErrors } from '../../redux/actions/dataActions';
//UI 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { LinkContainer } from 'react-router-bootstrap';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';


const Styled = styled.section`
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
                        <Modal.Body>
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
                                <Row>
                                    <Col sm={3}>
                                        <Image width="80px" height="80px" className="proPic" src={userImage} roundedCircle/>
                                    </Col>
                                    <Col sm={9}>
                                        <LinkContainer to={`/users/${userHandle}`}>
                                            <Modal.Title>@{userHandle}</Modal.Title>
                                        </LinkContainer>
                                        {/* <hr className="invisibleSeparator"/> */}
                                        { dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
                                        <br />
                                        {/* <hr className="invisibleSeparator"/> */}
                                        { body }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={8}>
                                        { goalType }
                                    </Col>
                                    <Col sm={4}>
                                        <LikeButton updateId = { updateId}/>
                                        {likeCount} Likes    
                                        <MyButton tip="Comment">
                                            <ChatIcon />
                                        </MyButton>
                                            {commentCount} Comments
                                    </Col>
                                    <hr />
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
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    update: state.data.update,
    UI: state.UI 
});

export default connect(mapStateToProps, { getUpdate  })(UpdateDialog)
