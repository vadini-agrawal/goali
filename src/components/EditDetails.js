import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
//UI 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
//Redux 
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';
//Icons 
import EditIcon from 'react-bootstrap-icons/dist/icons/pencil';
import FormGroup from 'react-bootstrap/FormGroup';
import MyButton from '../util/MyButton';


class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false 
    }
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio: '',
            website: credentials.website ? credentials.website: '',
            location: credentials.location ? credentials.location: '',
        });
    }
    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }

    handleClose = () => {
        this.setState({ open: false});
    }
    handleOpen = () => {
        this.setState({ open: true});
        this.mapUserDetailsToState(this.props.credentials);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton tip="Edit Details" id="editDetails">
                  <EditIcon onClick={this.handleOpen} />
                </MyButton>
                <Modal show={ this.state.open } onHide={ this.handleClose } size="lg">
                    <Modal.Header closeButton>
                     <Modal.Title>Edit Details</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
                        <form>
                            <Form>
                                <Form.Group>
                                <Form.Label>Bio</Form.Label>
                                <Form.Control name="bio" as="textarea" rows="2" placeholder="A short bio about yourself"  onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group>
                                <Form.Label>Website </Form.Label>
                                <Form.Control name="website" placeholder="Your website" onChange={this.handleChange}/> 
                                {/* //value = this.state.website  */}
                                </Form.Group>

                                <Form.Group>
                                <Form.Label>Location</Form.Label>
                                <Form.Control name="location" placeholder="Where you are" onChange={this.handleChange}/>
                                </Form.Group>
                            </Form>
                        </form>
                     </Modal.Body>
                 <Modal.Footer>
                     <Button variant="secondary" onClick={this.handleClose}>
                         Cancel
                     </Button>
                     <Button variant="primary" onClick={this.handleSubmit}>
                         Save Changes
                   </Button>
                  </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails})(EditDetails)
