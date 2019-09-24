import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import Library from '../Library';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem('authUser')),
      library: [],
      searchEntry: '',
      results: [],
    }
  }

  addMusicChange = (item) => {
    const song = item.song;
    const artist = item.artist;
    const album = item.album;
    const link = item.link;
    const uid = this.state.authUser.uid;
    this.props.firebase.library().push({ song, artist, album, link, uid })
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
    return(
      <div className="homePage">
        <h1>Welcome to your Dashboard, {this.state.authUser.username}!</h1>
        {/* <div className="search">
          <Search 
            onSearchLibrary={this.searchLibrary}
          /> 
        </div> */}
        {/* <div className="searchResults">
          <Results results={this.state.results}/>
        </div> */}
        <div className="library">
          <Library authUser={this.state.authUser} />
        </div>
      </div>
    )
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
)(HomePage);