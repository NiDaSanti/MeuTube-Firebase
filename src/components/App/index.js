import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import signUp from '../../containers/SignUp';
import signIn from '../../containers/SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import Admin from '../../containers/Admin';
import MusicPlayerPage from '../MusicPlayer'



import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
    <Router>
      <div className="whole-page">
        <Navigation />

        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={signUp} />
        <Route path={ROUTES.SIGN_IN} component={signIn} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={Admin} />
        <Route path={ROUTES.MUSIC_PAGE} component={MusicPlayerPage} />
        {/* <Route path={ROUTES.LIBRARYITEM} component={MusicPlayerPage} /> */}

      </div>
    </Router>
);
  

export default withAuthentication(App);