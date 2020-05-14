import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';
// UI 
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

// Icons 
import HouseIcon from 'react-bootstrap-icons/dist/icons/house-door-fill';
import LinkIcon from 'react-bootstrap-icons/dist/icons/link';
import CalendarIcon from 'react-bootstrap-icons/dist/icons/calendar-fill';

const StaticProfile = (props) => {
    const {classes, profile: { handle, createdAt, imageUrl, bio, website, location }} = props;

    return (
        <Fragment>
        <Card>
            <Card.Body>
            <div>
                <div className="profile-img">
                    <Image width="80px" src={imageUrl} alt="Profile Pic" roundedCircle></Image>
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
            </div>
        </Card.Body>
        </Card>
        </Fragment>
    )
}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object
}

export default StaticProfile;