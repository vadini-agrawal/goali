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
import PostUpdate from './update/PostUpdate';
import Notifications from './Notifications';

//Icons 
import { ReactComponent as AddIcon } from 'react-bootstrap-icons/dist/icons/plus';
import HomeIcon from 'react-bootstrap-icons/dist/icons/house-door-fill';
import NotifIcon from 'react-bootstrap-icons/dist/icons/bell-fill';

//import { Navbar, Nav } from 'react-bootstrap';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Form from 'react-bootstrap/Form';
const NavIcons= styled.div`
    display: inline-block !important;
    margin-right: 10px;
    margin-left: 10px;
    .dropdown-toggle::after {
        display: none;
    }
    svg {
        fill: #f5f5fe;
    }

`;
const NavText= styled.section`
    div {
        display: inline-block;
    }
    .nav-link {
        color:  #f5f5fe !important;
        display: inline-block;
    }
`;

export class Navibar extends Component {
    state = {}
    render() {
        const { authenticated } = this.props
        return (
            <Navbar fixed="top" className="justify-content-center" >
                { authenticated ? (
                    <Fragment>
                        <NavIcons>
                        <Nav.Item  style={{ 'marginRight': '25px'}}>
                            <span> 
                            <PostUpdate className="icon_link"  />
                            </span>
                        </Nav.Item>
                        </NavIcons>
                        <NavIcons>
                        <Nav.Item >
                            <Nav.Link className="icon_link" href="/">
                                <HomeIcon className="icon_link" />
                            </Nav.Link>
                        </Nav.Item>
                        </NavIcons>
                        <NavIcons>
                        <Nav.Item className="icon_link">
                            <Notifications className="icon_link" />
                        </Nav.Item>
                        </NavIcons>
                    </Fragment>
                    
                ) : (
                    <Fragment>
                        <NavText>
                        <Nav.Item>
                            <Nav.Link className="nav-link" href="/">
                                Home
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="nav-link" href="/login">
                                Login
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="nav-link" href="/signup">
                                Signup
                            </Nav.Link>
                        </Nav.Item>
                        </NavText>
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
