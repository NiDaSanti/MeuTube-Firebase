import React, { Component } from 'react';
// import { compose } from 'recompose';

// import { withFirebase } from '../Firebase';
// import { withAuthorization } from '../Session';

// import AddMusic from '../AddMusic';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   authUser: JSON.parse(localStorage.getItem('authUser')),
    //   library: [],
    //   searchEntry: '',
    //   results: [],
    // }
  }

  // addMusicChange = (item) => {
  //   const song = item.song;
  //   const artist = item.artist;
  //   const album = item.album;
  //   const link = item.link;
  //   const uid = this.state.authUser.uid;
  //   this.props.firebase.library().push({ song, artist, album, link, uid })
  // }

  render() {
    return(
      <div className="landing">
          {/* <div className="addMusic">
            <AddMusic 
              onAddMusicChange={this.addMusicChange}
            />
          </div> */}
        Music is Life
      </div>
    )
  }
}

export default LandingPage;

// const condition = authUser => !!authUser;

// export default compose(
//   withFirebase,
//   withAuthorization(condition),
// )(LandingPage);