import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
// Icons 
import Heart from 'react-bootstrap-icons/dist/icons/heart';
import HeartFull from 'react-bootstrap-icons/dist/icons/heart-fill';
// Redux
import { connect } from 'react-redux';
import { likeUpdate, unlikeUpdate } from '../../redux/actions/dataActions';

class LikeButton extends Component {
    likedUpdate = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.updateId === this.props.updateId)) {
            return true;
        } else return false;
    };
    likeUpdate = () => {
        this.props.likeUpdate(this.props.updateId);
    };
    unlikeUpdate = () => {
        this.props.unlikeUpdate(this.props.updateId);
    }
    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <LinkContainer to='/login'>
            <MyButton tip="Like">
                {/* <IconStyle> */}
                <Heart  />
                {/* </IconStyle> */}
            </MyButton>
            </LinkContainer>
        ) : (this.likedUpdate() ? (
            <MyButton tip="Unlike" >
                {/* <IconStyle> */}
                <HeartFull onClick ={ this.unlikeUpdate} />
                {/* </IconStyle> */}
            </MyButton>
        ) : (
            <MyButton tip="Like" >
                {/* <IconStyle> */}
                <Heart onClick ={ this.likeUpdate} />
                {/* </IconStyle> */}
            </MyButton>
        ));
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    updateId: PropTypes.string.isRequired,
    likeUpdate: PropTypes.func.isRequired,
    unlikeUpdate: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likeUpdate,
    unlikeUpdate
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);



