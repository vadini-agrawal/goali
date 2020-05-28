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
import ProfileSkeleton from '../../util/ProfileSkeleton';

//Icons
import HouseIcon from 'react-bootstrap-icons/dist/icons/house-door-fill';
import LinkIcon from 'react-bootstrap-icons/dist/icons/link';
import CalendarIcon from 'react-bootstrap-icons/dist/icons/calendar-fill';
import EditIcon from 'react-bootstrap-icons/dist/icons/pencil';
import Kanban from 'react-bootstrap-icons/dist/icons/kanban-fill';

//Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';
import MyButton from '../../util/MyButton';

const Styled = styled.section`
    position: fixed;
    .edit-button {
        vertical-align: bottom;
    }
    .profile-img {
        margin-top: 20px;
        text-align: center;
    }
    .profile-details {
        margin-top: 15px;
    }
    .icon {
        display: inline-block;
        margin-bottom: 3px;
    }
    .icon-desc {
        display: inline-block;
        margin-left: 10px;
    }
    .desc {
        text-align: center;
    }
    .bottom-div {
        text-align: right;
        justify-content: right;
    }
    .icon-bottom {
        margin-right: 10px;
    }
`;


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
            <Styled>
            <Card className="card">
                <Card.Body>
                    <div>
                        <div className="profile-img">
                            <Image width="80px" src={imageUrl} alt="Profile Pic" roundedCircle></Image>
                            <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange}/>
                            <MyButton tip="Change your profile picture" id="editImage" >
                                <EditIcon onClick={this.handleEditPicture} className="edit-button"/>
                            </MyButton>
                            <div className="profile-details"> 
                                <Link to={`/users/${handle}`}>@{handle}</Link>
                            </div>
                        </div>  

                        <br/>
                        { bio && (<Card.Text className="desc">
                                {bio}
                            </Card.Text>)}
                        <br />
                        { location && (
                            <Fragment>
                                <HouseIcon className="icon"/> 
                                <Card.Text className="icon-desc">
                                    { location }
                                </Card.Text>
                                <br/>
                            </Fragment>
                        )}
                        { website && (
                            <Fragment>
                                <LinkIcon className="icon"/> 
                                <Card.Text className="icon-desc">
                                    <a href={ website } target="_blank" rel="noopener noreferrer">
                                        {website}
                                    </a>
                                </Card.Text>
                                <br/>
                            </Fragment>
                        )}
                        <CalendarIcon className="icon"/>
                        <Card.Text className="icon-desc">
                            Joined { dayjs(createdAt).format('MMM YYYY')}
                        </Card.Text> <br />
                        <div className="bottom-div">
                            <MyButton tip="Log out" id="logoutUser" className="icon-bottom">
                                <Kanban onClick={this.handleLogoutUser}className="icon-bottom"/>
                            </MyButton>
                            <EditDetails className="icon-bottom"/>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            </Styled>
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
        )) : (<ProfileSkeleton />)
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
    classes: PropTypes.object,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(Profile)
