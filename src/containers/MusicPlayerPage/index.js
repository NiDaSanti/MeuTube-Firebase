import React from 'react';
import MusicPlayer from '../../components/MusicPlayer';

class MusicPlayerPage extends React.Component {
  constructor(props) {
    super(props);
    
  } 
  
  render(){
    return(
      <MusicPlayer />
    )
  }
}
    
export default MusicPlayerPage;