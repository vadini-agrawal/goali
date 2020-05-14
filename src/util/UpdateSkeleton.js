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
    margin-bottom: 10px;
    .div_title {
        background-color: gray;
        height: 20px;
        width: 250px;
        margin-bottom: 80px;
    }
    .div_body {
        background-color: silver;
        height: 50px;
        width: 400px;
    }
`;

const UpdateSkeleton = (props) => {
    const { classes } = props;


    const div_title = 
       <div ></div>
    const div_body = 
        <div></div>


    const content = Array.from({ length: 4}).map((item, index) => 
      (
        <CardStyle key={index}>
        <Card key={index}>
            <Card.Body>
             <Row>
                <Col xs={3} sm={3} md={3} lg={3}>
                    <Card.Img width="50px" src={NoImg} title="Profile Image"/>
                </Col>
                <Col xs={9} sm={9} md={9} lg={9}>
                    <div className="div_title">
                        {div_title}
                    </div>
                    <div className="div_body">
                        {div_body}
                    </div>
                </Col>
             </Row>
             <Row>
                 <div></div>
             </Row>
             <Row>
                 <div></div>
             </Row>
            </Card.Body>
        </Card>
        </CardStyle>
      ))
    return (
        <Fragment>
            { content }
        </Fragment>
    )
}

UpdateSkeleton.propTyeps = {
    classes: PropTypes.object.isRequired
}

export default UpdateSkeleton
