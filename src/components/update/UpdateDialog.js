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
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { LinkContainer } from 'react-router-bootstrap';
import LikeButton from './LikeButton';


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
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true });
        this.props.getUpdate(this.props.updateId);
    }
    handleClose = () => {
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
                userHandle 
            },
            UI: { loading }
        } = this.props;
       
        return (
            <Fragment>
                <Styled>
                <MyButton tip='Expand update'>
                    <UnfoldIcon onClick={ this.handleOpen } />
                </MyButton>
                <Modal show={ this.state.open  } onHide={ this.handleClose } width="60%">
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
                        <Modal.Body>
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
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    update: state.data.update,
    UI: state.UI 
});

export default connect(mapStateToProps, { getUpdate })(UpdateDialog)
