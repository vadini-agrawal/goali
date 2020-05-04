import React, { Component, Fragment } from 'react'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import { LinkContainer, Link } from 'react-router-bootstrap';
// UI 
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';


// Icons
import NotifIcon from 'react-bootstrap-icons/dist/icons/bell-fill';
import HeartFull from 'react-bootstrap-icons/dist/icons/heart-fill';
import ChatIcon from 'react-bootstrap-icons/dist/icons/chat-dots-fill';
// Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../redux/actions/userActions';

class Notifications extends Component {
    state = {
        anchorE1: null
    };

    onMenuOpened = () => {
        let unreadNotifId = this.props.notifications
            .filter(notif => !notif.read)
            .map(notif => notif.notificationId);
        console.log(unreadNotifId);
        console.log(this.props.notifications);
        this.props.markNotificationsRead(unreadNotifId);
        console.log('reached here');
    };

    render() {
        const notifications = this.props.notifications;
        const anchorE1 = this.state.anchorE1
        dayjs.extend(relativeTime);

        let notifIcon; 
        if (notifications && notifications.length > 0) {
            notifications.filter(notif => notif.read === false).length > 0
                ? (
                    notifIcon = (
                        <Fragment>
                            <NotifIcon /><Badge color="secondary">{notifications.filter(notif => notif.read === false).length}</Badge>
                        </Fragment>
                    )
                ): (
                    notifIcon = <NotifIcon /> 
                );
        } else {
            notifIcon = <NotifIcon />
        }
        let notificationsMarkup = 
            notifications && notifications.length > 0 ? (
                notifications.map(notif => {
                    const verb = notif.type === 'like' ? 'liked' : 'commented on';
                    const time = dayjs(notif.createdAt).fromNow();
                    const iconColor = notif.read ? 'primary': 'secondary';
                    const icon = notif.type === 'like' ? (
                        <HeartFull style = {{ marginRight: "10px"}}/>
                    ) : (
                        <ChatIcon style = {{ marginRight: "10px"}}/>
                    )
                    console.log(`/users/${notif.recipient}/update/${notif.updateId}`);
                    return (
                            <NavDropdown.Item key={notif.createdAt} href={`/users/${notif.recipient}/update/${notif.updateId}`}>
                                { icon }
                                <p> {notif.sender } {verb} your update {time} </p> 
                            </NavDropdown.Item>
                    )
                })
            ): (
                    <NavDropdown.Item onClick={this.handleClose}>
                        You have no notifications yet. 
                    </NavDropdown.Item>
            )

        return (
                <NavDropdown title={ notifIcon } onClick={ this.onMenuOpened}>
                    { notificationsMarkup }
                </NavDropdown>
        )
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, {markNotificationsRead})(Notifications);
