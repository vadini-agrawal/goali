import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
//Components
import Update from '../components/update/Update';
import Profile from '../components/profile/Profile';
import UpdateSkeleton from '../util/UpdateSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

//Redux 
import { connect } from 'react-redux';
import { getUpdates } from '../redux/actions/dataActions';


class home extends Component {
    componentDidMount() {
        this.props.getUpdates();
    }
    render() {
        const { updates, loading } = this.props.data;
        let recentUpdatesMarkup = !loading ? (
            updates.map(update => <Update key={update.updateId} update={update}/>)
        ) : ( 
            <UpdateSkeleton />
        );
        let profileMarkup = !loading ? (
            <Profile />
        ) : ( 
            <ProfileSkeleton />
        );
        return (
            <Container className="container-special">
                <Row>
                    <Col md={9} lg={9} sm={8} xs={12}>
                        {recentUpdatesMarkup}
                    </Col>
                    <Col md={3} lg={3} sm={4} xs={12}>
                        {profileMarkup}
                    </Col>
                </Row>
            </Container>
        );
    }
}

home.propTypes = {
    getUpdates: PropTypes.func.isRequired, 
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getUpdates })(home);
