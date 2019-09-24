import React from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      library: {},
      libUserKey: "",
    };
  }

  componentDidMount() {
    console.log("props: ", this.props);
    const songId = this.props.match.params.uid;
    console.log(this.props.firebase.libraryItem(songId));
    this.props.firebase.libraryItem(songId).once('value', snapshot => {
          let libraryObject = snapshot.val();
          console.log(libraryObject);
          this.setState({
            songLink: libraryObject.link,
          })
    })
  }

  render() {
    let videoSrc = "https://www.youtube.com/embed/" + this.state.songLink;
        
      return (
        <div className="container">
          <iframe 
            title= "Watch the Video" 
            className= "main-player" 
            width="100%" 
            height="100%"
            src={videoSrc}
            frameBorder="0"
            allow='autoplay; encrypted-media'
            allowFullScreen
          />
        </div>
      );
    }
}
  
console.log(MusicPlayer);
export default compose(withFirebase)(MusicPlayer);