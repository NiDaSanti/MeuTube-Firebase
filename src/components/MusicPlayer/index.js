import React from 'react';
//import { renderComponent } from 'recompose';

class VideoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: null
    }
  }
  
  componentDidUpdate(prevProps) {
    if(this.props.video && (prevProps.video !== this.props.video) ) {
      this.setState({video: this.props.video})
    }
  }
};


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
export default (MusicPlayer) (VideoDetail)

