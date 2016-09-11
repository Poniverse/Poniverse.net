import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, NavbarBrand, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import classNames from 'classnames';
// Importing these because the export from the module doesn't contain
// the child components, which breaks the serverside rendering if
// used the way the documentation wants us to.
// import NavbarHeader from 'react-bootstrap/lib/NavbarHeader';
// import NavbarCollapse from 'react-bootstrap/lib/NavbarCollapse';
// import NavbarToggle from 'react-bootstrap/lib/NavbarToggle';

class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    onLoginClick: PropTypes.func
  };

  render() {
    const { user } = this.props;

    return (
      <header>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/">Poniverse.net</IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/">
                <NavItem eventKey={1} href="/">Home</NavItem>
              </LinkContainer>
            </Nav>
            {user.loggedIn ? this.renderLoggedIn(user) : this.renderGuest()}
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }

  renderLoggedIn(user) {
    const { onButtonClick } = this.props;

    return (
      <Nav pullRight>
        <NavItem eventKey={1}>Welcome, {user.data.username}</NavItem>
        <NavItem eventKey={2} onClick={onButtonClick}>CLICK ME</NavItem>
      </Nav>
    );
  }

  renderGuest() {
    const { onLoginClick } = this.props;

    return (
      <Nav pullRight>
        <NavItem eventKey={1} href="#" onClick={onLoginClick}>Sign In</NavItem>
      </Nav>
    );
  }
}

export default Header;
