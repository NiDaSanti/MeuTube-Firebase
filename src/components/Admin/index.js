import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
      library: [],
      searchEntry: "",
      results: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.users().on('value', snapshot => {
        const usersObject = snapshot.val();

        const usersList = Object.keys(usersObject).map(key => ({
            ...usersObject[key],
            uid: key,
        }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
      this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div className="adminPage">
        <h1>Admin</h1>
          <p>
            You are an Admin on this App.  Below displays all the users of the App.
          </p>

            {loading && <div>Loading ... </div>}

            <UserList users={users} className="userList"/>
      </div>
    );
  }
}

const UserList = ({ users }) => (
    <ul className="userList">
      
        {users.map(user => (
            <li key={user.uid}>
                <span>
                    <strong>ID:</strong> {user.uid}
                </span><br/>
                <span>
                    <strong> E-Mail:</strong> {user.email}
                </span><br/>
                <span>
                    <strong> Username:</strong> {user.username}
                </span><br/><br/><hr/>
            </li>
        ))}
    </ul>
);

const condition = authUser => 
          authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
    withAuthorization(condition),
    withFirebase,
  )(AdminPage);