import React from 'react';
import { withFirebase } from '../Firebase';

const HomePage = () => (
  <div>This is your home page upon signing in.</div>
);

export default withFirebase(HomePage);