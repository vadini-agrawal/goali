import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
//UI 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Spinner from 'react-bootstrap/Spinner';
//Icons 
import EditIcon from 'react-bootstrap-icons/dist/icons/pencil';
import AddIcon from 'react-bootstrap-icons/dist/icons/plus';
import FormGroup from 'react-bootstrap/FormGroup';
import MyButton from '../util/MyButton';
//Redux 
import { connect } from 'react-redux';
import { postUpdate } from '../redux/actions/dataActions';

class PostUpdate extends Component {
    state = {
        open: false,
        body: '',
        goalType: '',
        errors: {}
    };
    // mapPostToState = (credentials) => {
    //     this.setState({
    //         bio: credentials.bio ? credentials.bio: '',
    //         website: credentials.website ? credentials.website: '',
    //         location: credentials.location ? credentials.location: '',
    //     });
    // }
    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: ''});
            this.handleClose();
        }
    }
    handleOpen = () => {
        this.setState({ open: true});
    }
    handleClose = () => {
        this.setState({ open: false, errors: {}});
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const newUpdate = {
            body: this.state.body,
            goalType: 'Small Win'
        };
        this.props.postUpdate({ });
        this.handleClose();
    }
    render() {
        const { errors } = this.state;
        const { classes, UI: { loading }} = this.props;
        return (
            <Fragment>
                <MyButton tip="Post an update"> 
                    <AddIcon onClick={this.handleOpen}/>
                </MyButton>
                <Modal show={this.state.open} onHide={this.handleClose} width="sm">
                    <Modal.Header closeButton>
                        <Modal.Title> Post update </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <Form>
                                    <Form.Group>
                                    <Form.Label>Your update</Form.Label>
                                    <Form.Control name="update" as="textarea" rows="2" onChange={this.handleChange} placeholder="Your small win!"  onChange={this.handleChange} isInvalid={errors.body }/>
                                    <Form.Control.Feedback type="invalid">
                                            {errors.body}
                                    </Form.Control.Feedback>
                                    </Form.Group>
                                </Form>
                            </form>
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={this.handleSubmit} disabled={loading}>
                            <span>Post</span> 
                            {loading && (<Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            />)}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}

PostUpdate.propTypes = {
    postUpdate: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    UI: state.UI,
});

export default connect(mapStateToProps, { postUpdate })(PostUpdate);
