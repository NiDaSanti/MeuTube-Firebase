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
    // // let link = this.props.firebase.library(libId).link;
    // console.log(this.props.firebase.library());
    // this.props.firebase.library().on('value', snapshot => {
    //     const libraryObject = snapshot.val();

    //     const libraryList = Object.keys(libraryObject).map(key => ({
    //         ...libraryObject[key],
    //         libUserKey: key,
    //     }));

    //   this.setState({
    //     library: libraryList,
    //   });
    // });
  }

    render() {
      // console.log("the library is: ", this.state.library);
      // let link = this.state.libUserKey;
      // console.log("a link is: ", link);
      const link = this.props.link;
      console.log("this is the link: ", link);
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