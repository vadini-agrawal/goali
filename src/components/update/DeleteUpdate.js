import React, { Component, Fragment } from 'react'
import styled from 'styled-components';
import relativeTime from 'dayjs/plugin/relativeTime';
import { LinkContainer} from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { deleteUpdate} from '../../redux/actions/dataActions';
import PropTypes from 'prop-types';
//UI 
import MyButton from '../../util/MyButton';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//Icons 
import DelIcon from 'react-bootstrap-icons/dist/icons/x-circle';

const Styled = styled.section`
    .deleteIcon {
        position: absolute;
        left: 90%;
        top: 10%;
    }
`;

class DeleteUpdate extends Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true});
    }
    handleClose = () => {
        this.setState({ open: false});
    }
    deleteUpdate = () => {
        this.props.deleteUpdate(this.props.updateId);
        this.setState({ open: false});
    }
    render() {
        return (
            <Fragment>
                <Styled>
                <MyButton tip="Delete update" >
                    <DelIcon className="deleteIcon" onClick={this.handleOpen}/>
                </MyButton>
                </Styled>
                <Modal show={ this.state.open } onHide={ this.handleClose } size="sm">
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete this update?</Modal.Title>
                    </Modal.Header>

                        <Modal.Footer>
                            <Button variant="primary" onClick={this.handleClose}>
                                Cancel
                            </Button>
                            <Button variant="secondary" onClick={this.deleteUpdate}>
                                Delete
                            </Button>
                        </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}

DeleteUpdate.propTypes = {
    deleteUpdate: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    updateId: PropTypes.string.isRequired
}

export default connect(null, { deleteUpdate })(DeleteUpdate)
