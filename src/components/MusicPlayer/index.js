import React from 'react';
//import { renderComponent } from 'recompose';

const MusicPlayer = () => ({
    render: function() {
      var videoSrc = "https://www.youtube.com/embed/" + 
          this.props.video + "?autoplay=" + 
          this.props.autoplay + "&rel=" + 
          this.props.rel + "&modestbranding=" +
          this.props.modest;
      return (
        <div className="container">
          <iframe title= "Watch the Video" className= "main-player" width="100%" height="100%"
    src={videoSrc}
    frameborder="0"/>
        </div>
      );
    }
  });
  
console.log(MusicPlayer);
export default MusicPlayer;