import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import Library from '../Library';
import { FontAwesome } from 'react-web-vector-icons';
// import Search from '../Search';
// import Results from '../Results';

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

  handleChange = (e) => {
      this.setState({
          searchEntry: e.target.value
      });
  }

  filterResults = () => {
      const { library, searchEntry } = this.state;
      const resultsArray = [];
      const results = library.filter((item) => {
        // create a long string to search by
        const itemData = (
            item.song
            + item.artist
            + item.album
        )
            .replace(/[^a-zA-Z0-9]/g, '')
            .toLowerCase();
        // console.log("long string: ", itemData);
        // lowerCase the user input
        const formattedText = searchEntry.toLowerCase();
        // console.log("searchEntry to lower: ", formattedText);
        // get matches and ignore spaces between words
        const doesMatchEntry = itemData.indexOf(formattedText.replace(/\s/g, '')) > -1;
        // console.log("matches search entry? ", doesMatchEntry);
        if (doesMatchEntry === true) {
            resultsArray.push(item);
        }
        });
      console.log("array of matches: ", results);
      
      // // set visit array to results array and update text state
      this.setState({
          results: resultsArray,
      });
  };

  // searchLibrary = (searchString) => {
  //   //console.log("user is searching for: ", this.state.searchEntry);
  //   let library = this.state.library;
  //   const results = this.filterResults(library, searchString);
  //   // return results;
  //   this.setState({
  //     searchEntry: "",
  //   })
  // }

  render() {
    const searchEntry = this.state.searchEntry;
    const library = this.state.library;
    console.log("user is searching for: ", searchEntry);
    return(
      <div className="searchAndHome">
        {/* <Search onSearchLibrary={this.searchLibrary}/> */}
          <div className="searchBar">
                <input 
                    type="text"
                    name="searchString"
                    value={this.state.searchEntry}
                    onChange={this.handleChange}
                    placeholder="Search your music..."
                    className="searchInput"
                />
                <button 
                    onClick={() => this.filterResults(library, searchEntry)} 
                    className="searchButtonButton"
                >
                    <FontAwesome
                    name='search'
                    color='white'
                    size={25}
                    className="searchButton"
                />
                </button>
               {/* {isResults && <Results results={this.state.results} length={this.state.results.length}/>} */}
                <br/>
          </div>
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
            <div className="resultsList">
              {this.state.results}
            </div>
            <div className="library">
              <Library authUser={this.state.authUser} />
            </div>
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