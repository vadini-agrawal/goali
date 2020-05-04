import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
// UI 
import Update from '../components/update/Update';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import StaticProfile from '../components/profile/StaticProfile';
import UpdateSkeleton from '../util/UpdateSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

// Redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
    state = {
        profile: null,
        updateIdParam: null
    }
    componentDidMount() {
        const handle = this.props.match.params.handle;
        const updateId = this.props.match.params.updateId;

        if (updateId) this.setState({updateIdParam: updateId});

        this.props.getUserData(handle);

        axios.get(`/user/${handle}`)
            .then(res => {
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(err => console.log(err));
        console.log(this.state);
    }
    render() {
        const { updates, loading } = this.props.data;
        const { updateIdParam } = this.state;

        const updatesMarkup = loading ? (
            <UpdateSkeleton />
        ): updates === null ? (
                <p> No updates from this user. </p>
            ) : !updateIdParam ? (   
                updates.map(update => 
                    <Update key={update.updateId } update={update }/>)
        ): (
            updates.map((update) => {
                if (update.updateId !== updateIdParam) {
                    return  <Update key={update.updateId } update={update } />;
                } else {
                    return <Update key={update.updateId } update={update } openDialog />
                }
            })
        );
        return (
            <Container className="container-special">
            <Row>
                <Col md={9} lg={9} sm={8} xs={12}>
                    { updatesMarkup }
                </Col>
                <Col md={3} lg={3} sm={4} xs={12}>
                    { this.state.profile === null ? (
                        <ProfileSkeleton/>
                    ): (
                        <StaticProfile profile={this.state.profile} />
                    )}
                </Col>
            </Row>
            </Container>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getUserData})(user);
