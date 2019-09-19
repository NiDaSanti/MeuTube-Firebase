import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

import AddMusic from '../AddMusic';

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

  // componentDidMount() {
  //   this.props.firebase.users().on('value', snapshot => {
  //       const usersObject = snapshot.val();

  //       const usersList = Object.keys(usersObject).map(key => ({
  //           ...usersObject[key],
  //           uid: key,
  //       }));

  //     this.setState({
  //       users: usersList,
  //     });
  //   });
  // }

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
          <div className="addMusic">
            <h2>Add Music to your Library:</h2>
            <AddMusic 
              onAddMusicChange={this.addMusicChange}
            />
          </div>
        {/* <div className="search">
          <Search 
            onSearchLibrary={this.searchLibrary}
          /> 
        </div> */}
        {/* <div className="searchResults">
          <Results results={this.state.results}/>
        </div> */}
        {/* <div className="library">
          <Library />
        </div> */}
      </div>
    )
  }
}

const condition = authUser => !!authUser;

// export default withAuthorization(condition)(HomePage);

export default compose(
  withFirebase,
  withAuthorization(condition),
)(HomePage);

// class LibraryBase extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       loading: false,
//       library: [],
//       userId: '',
//     };
//   }

//   componentDidMount() {
//     // this.setState({ loading: true });

//     // this.props.firebase.library().on('value', snapshot => {
//     //   const libraryObject = snapshot.val();

//     //   if (libraryObject) {
//     //     const libraryList = Object.keys(libraryObject).map(key => ({
//     //         ...libraryObject[key],
//     //         uid: key,
//     //     }));

//     //     this.setState({
//     //         library: libraryList,
//     //         loading: false,
//     //     });
//     //   } else {
//     //     this.setState({ library: null, loading: false });
//     //   }
//     // });
//   }

//   componentWillUnmount() {
//     this.props.firebase.library().off();
//   }

//   addMusicChange = (item) => {
//     console.log('adding music', item)
//     console.log("library within addMusicChangefx: ", this.state.library);
//     const library = this.state.library;
//     library.push(item)
//     this.setState({
//       library: library,
//     })
//   }

//   render() {
//     console.log("user is ", this.props.firebase.userId);
//     const { library, loading } = this.state;

//     let user = this.props.firebase.user();
//     console.log("user in Home comp is: ", user);

//     return(
//       <div>
//         {/* {loading && <div>Loading ...</div>}

//         {library ? (
//           <LibraryList library={library} />
//         ) : ( */}
//           <div>There's nothing in your library yet!  Find a music video you like on <a href="https://youtube.com">YouTube</a>, and copy the end of the link for it.  Example: the link for a video will say "https://youtu.be/<strong>8fo6Hmh89ms</strong>" but the only part you need to copy is "<strong>8fo6Hmh89ms</strong>".  Paste that part into the YouTubeLink field below.
//           <AddMusic library={library} onAddMusicChange={this.addMusicChange}/>
//           </div>
//         {/* )} */}
//       </div>
//     );
//   }
// }

// const LibraryList = ({ library }) => (
//   <ul>
//     {library.map(item => (
//       <LibraryItem key={item.uid} item={item} />
//     ))}
//   </ul>
// );

// const LibraryItem = ({ item }) => (
//   <li>
//     {item.song}
//   </li>
// );

// const Library = withFirebase(LibraryBase);