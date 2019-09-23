import React from 'react';
import { compose } from 'recompose';
//import { renderComponent } from 'recompose';
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
    // let libId = "LpAXZv9srxUh5xFZzSA";
    // let link = this.props.firebase.library(libId).link;
    // console.log(this.props.firebase.library(libId).link);
    this.props.firebase.library().on('value', snapshot => {
        const libraryObject = snapshot.val();

        const libraryList = Object.keys(libraryObject).map(key => ({
            ...libraryObject[key],
            libUserKey: key,
        }));

      this.setState({
        library: libraryList,
      });
    });
  }

  render() {
    let library = this.state.library;
    console.log("library: ", library);

    // let songLink = library[3];
    // console.log("the object for one song is: ", songLink);

    let link = "S2Cti12XBw4";
    // this.getTheLink(songLink);
    // console.log("the link is: ", link);
    
    let videoSrc = "https://www.youtube.com/embed/" + link;
        // this.props.video + "?autoplay=" + 
        // this.props.autoplay + "&rel=" + 
        // this.props.rel + "&modestbranding=" +
        // this.props.modest;
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