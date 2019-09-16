import React from 'react';
import { withAuthorization } from '../Session';
import Search from '../Search';

const HomePage = () => (
  <div>
    <h1>HomePage</h1>
    <Search />
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);