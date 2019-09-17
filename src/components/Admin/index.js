import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

import Search from '../Search';
import AddMusic from '../AddMusic';

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

  addMusicChange = (item) => {
    console.log('adding music', item)
    let library = this.state.library;
    library.push(item)
    this.setState({
      library: library,
    })
  }

  filterIt = (library, searchEntry) => {
    return library.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchEntry)));
  }

  searchLibrary = (searchString) => {
    let library = this.state.library;
    const results = this.filterIt(library, searchString);
    this.setState({
      searchEntry: "",
      results: results,
    })
  }

  render() {
    const { users, loading } = this.state;
    console.log("library in Admin component: ", this.state.library);
    console.log("results are: ", this.state.results)
    return (
      <div className="adminPage">
        <h1>Admin</h1>
          <p>
            The Admin Page is accessible by every signed in admin user.
          </p>
            <AddMusic 
              onAddMusicChange={this.addMusicChange}
            />
            <Search 
              onSearchLibrary={this.searchLibrary}
            />
            {loading && <div>Loading ... </div>}

            <UserList users={users} />
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
                </span><br/><hr/>
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