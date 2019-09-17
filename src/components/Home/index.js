import React from 'react';
import { withAuthorization } from '../Session';


const HomePage = () => (
  <div className = "this-random-header">
    <h1 className = "play-with-this">HomePage</h1>
    <p className = "middle-for-now"></p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);