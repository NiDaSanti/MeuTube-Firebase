import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo3.png';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <div className="navigation">
    <div className="logoImage">
      <img src={Logo} alt="MeuTube Logo"></img>
    </div>
    <ul>
      <li>
        <Link to={ROUTES.LANDING} className="a">Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME} className="a">Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT} className="a">Account</Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN} className="a">Admin</Link>
      </li>
        <SignOutButton />
    </ul>
  </div>
);

const NavigationNonAuth = () => (
  <div className="navigation">
    <div className="logoImage">
      <img src={Logo} alt="MeuTube Logo"></img>
    </div>
    <div className="navLinks">
    <ul>
      <li>
        <Link to={ROUTES.LANDING} className="a">Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN} className="a">Sign In</Link>
      </li>
    </ul>
    </div>
  </div>
)

export default Navigation;

    