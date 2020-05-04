import React, { Component, Fragment } from 'react';
import NoImg from '../images/no_img.png';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// UI 
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CardStyle = styled.section`
text-align: center;
align-items: center;
margin-bottom: 10px;
`;
const DivTitle = styled.section`
background-color: silver;
height: 20px;
width: 100px;
margin-top: 10px;
margin-bottom: 20px;
margin-right: 50px;
margin-left: 50px;
`;
const DivBody = styled.section`
background-color: silver;
height: 50px;
width: 400px;
`;

const ProfileSkeleton = (props) => {
    const { classes } = props;


    // const div_title = 
    //     <DivTitle><div ></div></DivTitle>
    // const div_body = 
    //     <DivBody><div></div></DivBody>


    const content = Array.from({ length: 6}).map((item, index) => 
      (
        <DivTitle><div key={index}></div></DivTitle>
      ))
    return (
        <Fragment>
            <CardStyle>
            <Card>
            <Card.Body>
                <Image width="80px" src={NoImg} alt="Profile Pic" roundedCircle/>
                { content }
            </Card.Body>
            </Card>
            </CardStyle>
        </Fragment>

    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default ProfileSkeleton
