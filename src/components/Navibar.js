import React, { Component, Fragment } from 'react';
//Redux 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
//import Link from 'react-router-dom/Link';
// Bootstrap stuff 
import { LinkContainer } from "react-router-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/Nav';
import MyButton from '../util/MyButton';
import PostUpdate from '../components/PostUpdate';
//Icons 
import AddIcon from 'react-bootstrap-icons/dist/icons/plus';
import HomeIcon from 'react-bootstrap-icons/dist/icons/house-door-fill';
import NotifIcon from 'react-bootstrap-icons/dist/icons/bell-fill';

//import { Navbar, Nav } from 'react-bootstrap';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Form from 'react-bootstrap/Form';
const NavIcons= styled.section`
  text-align; center;
  align-item: center;
  margin: 10px;
  margin-left: 35vw;
  display: inline-block;
`;
const IconSpace = styled.section`
`;

export class Navibar extends Component {
    state = {}
    render() {
        const { authenticated } = this.props
        
        return (
            <Navbar fixed="top" bg="primary" variant="dark">
                { authenticated ? (
                    <Fragment>
                        <NavIcons>
                        <PostUpdate />
                        {/* <IconSpace> */}
                        <LinkContainer to="/">
                            <MyButton tip="Home">
                                <HomeIcon/>
                            </MyButton>
                        </LinkContainer>
                        {/* </IconSpace> */}
                        {/* <IconSpace> */}
                        <MyButton tip="Notifications">
                            <NotifIcon/>
                        </MyButton>
                        {/* </IconSpace> */}
                    </NavIcons>
                    </Fragment>
                    
                ) : (
                    <Fragment>
                    <Navbar.Brand>
                        <LinkContainer to="/">
                            <NavItem>
                                Home
                            </NavItem>
                        </LinkContainer>
                        </Navbar.Brand>
                        <Nav className="mr-auto">
                        <Nav.Link>
                            <LinkContainer to="/login">
                                <NavItem>
                                    Login
                                </NavItem>
                            </LinkContainer>
                        </Nav.Link>
                        <Nav.Link>
                            <LinkContainer to="/">
                                <NavItem>
                                    Home
                                </NavItem>
                            </LinkContainer>
                        </Nav.Link>
                        <Nav.Link>
                            <LinkContainer to="/signup">
                                <NavItem>
                                    Signup
                                </NavItem>
                            </LinkContainer>
                        </Nav.Link>
                        </Nav>
                    </Fragment>
                ) }
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

Navibar.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(Navibar);
