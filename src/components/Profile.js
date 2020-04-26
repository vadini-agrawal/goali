import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
//UI 
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { LinkContainer }  from 'react-router-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
//Icons
import HouseIcon from 'react-bootstrap-icons/dist/icons/house-door-fill';
import LinkIcon from 'react-bootstrap-icons/dist/icons/link';
import CalendarIcon from 'react-bootstrap-icons/dist/icons/calendar-fill';
import EditIcon from 'react-bootstrap-icons/dist/icons/pencil';
import Kanban from 'react-bootstrap-icons/dist/icons/kanban-fill';

//Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';
import MyButton from '../util/MyButton';


class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        // send to server 
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    };
    handleEditPicture = (event) => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };
    handleLogoutUser = () => {
        this.props.logoutUser();
    }
    render() {
        const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location}, loading, authenticated}} = this.props;
        
        let profileMarkup = !loading ? (authenticated ? (
            <Card>
                <Card.Body>
                    <div>
                        <div className="profile-img">
                            <Image width="80px" src={imageUrl} alt="Profile Pic" roundedCircle></Image>
                            <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange}/>
                            <MyButton tip="Change your profile picture" id="editImage">
                                <EditIcon onClick={this.handleEditPicture} />
                            </MyButton>
                        </div>  
                        <br/>
                        <div className="profile-details">
                                <Link to={`/users/${handle}`}>@{handle}</Link>
                        </div>
                        <br/>
                        { bio && (<Card.Text>
                                {bio}
                            </Card.Text>)}
                        <br />
                        { location && (
                            <Fragment>
                                <HouseIcon/> 
                                <Card.Text>
                                    { location }
                                </Card.Text>
                                <br/>
                            </Fragment>
                        )}
                        { website && (
                            <Fragment>
                                <LinkIcon/> 
                                <Card.Text>
                                    <a href={ website } target="_blank" rel="noopener noreferrer">
                                        {website}
                                    </a>
                                </Card.Text>
                                <br/>
                            </Fragment>
                        )}
                        <CalendarIcon/>
                        <Card.Text>
                            Joined { dayjs(createdAt).format('MMM YYYY')}
                        </Card.Text>
                        <MyButton tip="Log out" id="logoutUser">
                            <Kanban onClick={this.handleLogoutUser} />
                        </MyButton>
                    </div>
                    <EditDetails />
                </Card.Body>
            </Card>
        ): (
            <Card>
                <Card.Text>
                    No profile found, please login again.
                    <br/>
                    <LinkContainer to="/login">
                        <Button variant="primary"> Login </Button>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                        <Button variant="secondary"> Signup </Button>
                    </LinkContainer>
                </Card.Text>
            </Card>
        )) : (<p> Loading... </p>)
        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    logoutUser, uploadImage
};

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(Profile)
