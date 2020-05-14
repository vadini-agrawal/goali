import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Link from 'react-router-dom/Link';
import PropTypes from 'prop-types';
import AppIcon from '../images/logo.png';
//Redux stuff 
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

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
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker-custom.js', {scope: '/'});
          }
    };
    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '', errors: {}})
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        // this.setState({
        //     loading: true
        // });
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history);
        window.history.pushState(null, null, '/home');
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        const { classes, UI: {loading } } = this.props;
        const { errors } = this.state;
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
                    <Form.Control name="email"  type="email" placeholder="Enter email" onChange={this.handleChange} isInvalid={errors.email ? true: false} />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password"  type="password" placeholder="Password" onChange={this.handleChange} isInvalid={errors.password ? true: false}/>
                    <Form.Control.Feedback type="invalid">
                            {errors.password}
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
                    {loading ? 'Loading…' : 'Log In'}
                    </Button>
                </ImageSize>
                <ImageSize>
                    <Form.Label>
                        Don't have an account? Sign up <Link to="/signup"> here</Link>.
                    </Form.Label>
                </ImageSize>
            </Form>
        </LoginDiv>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user, 
    UI: state.UI
});

const mapActionsToProps = {
    loginUser 
}

export default connect(mapStateToProps, mapActionsToProps)(login);
