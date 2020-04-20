import React, { Component } from 'react';
//import styled from 'styled-components';
//import Link from 'react-router-dom/Link';
// Bootstrap stuff 
import { LinkContainer } from "react-router-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/Nav';

//import { Navbar, Nav } from 'react-bootstrap';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Form from 'react-bootstrap/Form';

export class Navibar extends Component {
    render() {
        return (
            <Navbar fixed="top" bg="dark" variant="dark">
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
            </Navbar>
        )
    }
}

export default Navibar
