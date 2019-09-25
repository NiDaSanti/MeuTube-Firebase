import React from 'react';

class SearchBar extends React.Component {
    state = {
        videos: []
    };

    componentDidUpdate(prevProps) {
        if(this.props.video && prevProps.video !== this.props.video) {
            this.setState({videos: this.props.videos})
        }
    }

 onSelect = (value, index) => {
     let val = parseInt(index.key, 10);
     this.props.handleSearch(val);
 };

 render() {
     return(
         <div className='music-search-bar'>
             
         </div>
     )
 }

    
}
export default SearchBar;