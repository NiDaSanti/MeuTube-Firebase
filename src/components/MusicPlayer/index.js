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
  
  /* React.render(
    <MusicPlayer video="mYFaghHyMKc" autoplay="0" rel="0" modest="1" />,
    document.body 
  ); */
console.log(MusicPlayer);
export default MusicPlayer;