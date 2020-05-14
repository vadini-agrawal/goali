import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';

// //Redux 
// import { connect } from 'react-redux';
// import { getUpdate } from '../../redux/actions/dataActions';

// MUI 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { LinkContainer} from 'react-router-bootstrap';


const ImageStyle = styled.section`
    text-align: center;
    margin: 20px;
`;


class Comments extends Component {
    render() {
        const { comments, classes }  = this.props; 
        return (
            <Fragment>
                { comments.map((comment) => {
                    const { body, createdAt, userImage, userHandle } = comment;
                    return (
                        <Container >
                            <hr />
                            <Row key={ createdAt }>
                                <ImageStyle>
                                <Col  sm={2}> 
                                    <Image width ='50px' src={ userImage } alt="Propic" roundedCircle/>
                                </Col>
                                </ImageStyle>
                                <Col  sm={10}>
                                    <div>
                                        <LinkContainer to={`/users/${userHandle}`}>
                                            <h6>{userHandle}</h6>
                                        </LinkContainer>
                                        <p>
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')} <br/>
                                            { body }
                                        </p>    
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    )
                })}
            </Fragment>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array
}

export default (Comments)
