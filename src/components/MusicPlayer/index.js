import React, { Component } from 'react';

class MusicPlayer extends Component {
    constructor(props){
      super(props);
      this.state={
        authUser: JSON.parse(localStorage.getItem('authUser')),
      }
    }

    getLink = (library) => {
      if (library) {
        return this.state.firebase.library().link;
      }
    }

    render() {
      const uid = this.state.authUser.uid;

      const library = this.state.firebase.library().includes(uid);

      const link = this.getLink(library);

      const videoSrc = "https://www.youtube.com/embed/" + link;
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
            frameborder="0"
            allow='autoplay; encrypted-media'
            allowFullScreen
          />
        </div>
      )
    }
  }
  
console.log(MusicPlayer);
export default MusicPlayer;