import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppIcon from '../images/logo.png';
import axios from 'axios';

const SignupDiv= styled.section`
  width: 50%;
  margin: auto;
  margin-top: 10%;
`;
const ImageSize = styled.section`
  text-align: center;
  margin-bottom: 10px;
`;
const SignupTitle = styled.section`
  font-size: 40px;
  margin-bottom: 10px;
  text-align: center;
`;

export class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            loading: false,
            errors: {}
        }
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        axios.post('/signup', newUserData)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
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
        <SignupDiv>
            <Form noValidate validate={this.validated} onSubmit={this.handleSubmit}>
                <ImageSize>
                    <Image height="50px" src={AppIcon} alt="Goali Logo" rounded/>
                </ImageSize>
                <SignupTitle>
                    <Form.Label>
                        Sign up for Goali!
                    </Form.Label>
                </SignupTitle>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" id="email" type="email" placeholder="Enter email" onChange={this.handleChange} isInvalid={errors.email ? true: false} />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" id="password" type="password" placeholder="Password" onChange={this.handleChange} isInvalid={errors.password ? true: false}/>
                    <Form.Control.Feedback type="invalid">
                            {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control name="confirmPassword" id="confirmPassword" type="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange} isInvalid={errors.confirmPassword ? true: false}/>
                    <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicHandle">
                    <Form.Label>Handle</Form.Label>
                    <Form.Control name="handle" id="handle" type="handle" placeholder="Handle" onChange={this.handleChange} isInvalid={errors.handle ? true: false}/>
                    <Form.Control.Feedback type="invalid">
                            {errors.handle}
                    </Form.Control.Feedback>
                </Form.Group>

                {errors.general && (
                    <Alert variant="danger">
                        {errors.general}
                    </Alert>
                )}
                <ImageSize>
                    <Button className="largebutton" variant="danger" type="submit"
                    disabled={loading}>
                    {loading ? 'Loading…' : 'Sign Up'}
                    </Button>
                </ImageSize>
                <ImageSize>
                    <Form.Label>
                        Already have an account? Log in <Link to="/login"> here</Link>.
                    </Form.Label>
                </ImageSize>
            </Form>
        </SignupDiv>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired
};

export default signup
