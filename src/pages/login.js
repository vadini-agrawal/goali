import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
// import PropTypes from 'prop-types';
import AppIcon from '../images/logo.png';
import axios from 'axios';

const LoginDiv= styled.section`
  width: 50%;
  margin: auto;
  margin-top: 15%;
`;
const ImageSize = styled.section`
  text-align: center;
  margin-bottom: 10px;
`;
const LoginTitle = styled.section`
  font-size: 40px;
  margin-bottom: 10px;
  text-align: center;
`;

export class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/login', userData)
            .then(res => {
                console.log(res.data);
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            })
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
        <LoginDiv>
            <Form noValidate validate={this.validated} onSubmit={this.handleSubmit}>
                <ImageSize>
                    <Image height="50px" src={AppIcon} alt="Goali Logo" rounded/>
                </ImageSize>
                <LoginTitle>
                    <Form.Label>
                        Login
                    </Form.Label>
                </LoginTitle>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" id="email" type="email" placeholder="Enter email" onChange={this.handleChange} isInvalid={errors.email ? true: false} />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" id="password" type="password" placeholder="Password" onChange={this.handleChange}/>
                </Form.Group>

                {errors.general && (
                    <Alert variant="danger">
                        {errors.general}
                    </Alert>
                )}

                <ImageSize>
                    <Button className="largebutton" variant="danger" type="submit">
                        Log In
                    </Button>
                </ImageSize>
            </Form>
        </LoginDiv>
        )
    }
}

export default login
