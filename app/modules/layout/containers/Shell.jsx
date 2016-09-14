import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../../../style/vendor.scss';
import './Shell.scss';
import { startAuth, finishAuth, logout } from '../../auth/redux/auth';
import { getLoggedInUser } from '../../user/redux/user';
import { Field, reduxForm } from 'redux-form';
import LoginFormModal from '../../auth/containers/LoginFormModal';
import Notifications from 'react-notification-system-redux';

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
class Shell extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    notifications: PropTypes.array.isRequired,
    children: PropTypes.object
  };

  render() {
    const { children, user, actions, notifications } = this.props;

    return (
      <div className="shell">
        <Notifications notifications={notifications} />
        <Header user={user} onLoginClick={actions.startAuth} onLogoutClick={actions.logout} />
        <main>
          { children }
        </main>
        <Footer />
        <LoginFormModal />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    user: state.user,
    notifications: state.notifications
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({startAuth, finishAuth, getLoggedInUser, logout}, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Shell);
