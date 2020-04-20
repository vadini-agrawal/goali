import React, { Component } from 'react'
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import { LinkContainer} from 'react-router-bootstrap';
// import Link from 'react-router-dom/Link';

//Bootstrap stuff 
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Image from 'react-bootstrap/Image';

const CardStyle = styled.section`
  margin-bottom: 10px;
`;
// const ContainerSpecial = styled.img`
//   border-radius: 50%;
// `;

export class Update extends Component {
    render() {
        dayjs.extend(relativeTime);
        const { classes, update: { body, createdAt, userImage, goalType, userHandle, updateId, likeCount, commentCount} } = this.props;
        return (
            <CardStyle>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col xs={3} sm={3} md={3} lg={3}>
                                <Card.Img width="50px" src={userImage} title="Profile Image"/>
                            </Col>
                            <Col xs={9} sm={9} md={9} lg={9}>
                                <Card.Title>
                                    <Card.Link href={`/users/${userHandle}`}> 
                                        {userHandle}
                                    </Card.Link>
                                </Card.Title>
                                    <Card.Text>
                                        {dayjs(createdAt).fromNow()} <br></br>
                                        {body}
                                    </Card.Text>
                            </Col>
                        </Row>
                        <br>
                        </br>
                        <Row>
                            <Col xs={3} sm={3} md={3} lg={3}>
                
                            </Col>
                            <Col xs={9} sm={9} md={9} lg={9}>
                                <Card.Text>
                                    {goalType}
                                </Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </CardStyle>
        )
    }
}

export default Update
