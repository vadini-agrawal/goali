import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
//UI 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
//Icons 
import AddIcon from 'react-bootstrap-icons/dist/icons/plus';
import MyButton from '../util/MyButton';
//Redux 
import { connect } from 'react-redux';
import { postUpdate, clearErrors } from '../redux/actions/dataActions';

class PostUpdate extends Component {
    state = {
        open: false,
        body: '',
        goalType: '',
        errors: {}
    };
    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '',  open: false, errors: {}});
        }
    }
    handleOpen = () => {
        this.setState({ open: true});
    }
    handleClose = () => {
        this.props.clearErrors();
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
        this.props.postUpdate(newUpdate);
        if (!this.state.errors) {
            this.handleClose();
        }
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
                    <Form onSubmit = {this.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title> Post update </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                    <Form.Group>
                                    <Form.Label>Your update</Form.Label>
                                    <Form.Control name="body" as="textarea" rows="2" size="lg" placeholder="Your small win!"  onChange={this.handleChange} isInvalid={errors.body }/>
                                    <Form.Control.Feedback type="invalid">
                                            {errors.body}
                                    </Form.Control.Feedback>
                                    </Form.Group>
                            
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" type="submit" disabled={loading}>
                            {loading ? (<Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            />): <span>Post</span>}
                        </Button>

                    </Modal.Footer>
                    </Form>
                </Modal>
            </Fragment>
        )
    }
}

PostUpdate.propTypes = {
    postUpdate: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI,
});

export default connect(mapStateToProps, { postUpdate, clearErrors })(PostUpdate);
