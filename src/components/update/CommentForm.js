import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//Redux 
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

//UI 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const ImageStyle = styled.section`
    text-align: center;
    margin: 20px;
`;


class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    }
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
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const newComment = {
            body: this.state.body,
        };
        this.props.submitComment(this.props.updateId, newComment);
    }
    render() {
        const { classes, authenticated }  = this.props;
        const errors = this.state.errors;

        const commentFormMarkup = authenticated ? (
            <Fragment>
            <Container >
                <hr/>
                <Row >
                    <Col  sm={2}> </Col>
                    <Col  sm={10}>
                        <Form onSubmit = {this.handleSubmit}>
                        <Form.Row>
                            <Col sm={9}>
                            <Form.Control  type="text" name="body" placeholder="Comment" value={this.state.body} onChange={this.handleChange} isInvalid={errors.comment } />
                            <Form.Control.Feedback type="invalid">
                                {errors.comment}
                            </Form.Control.Feedback>
                            </Col>
                            <Col sm={3}>
                                <Button variant="danger" type="submit">
                                Submit </Button>
                            </Col>
                        </Form.Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
            </Fragment>
        ) : (null)
        return commentFormMarkup;
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object,
    updateId: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,

}

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, { submitComment})(CommentForm)
