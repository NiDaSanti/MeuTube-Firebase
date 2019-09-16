import React from 'react'
import { FontAwesome } from 'react-web-vector-icons';

class Search extends React.Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    searchUserLibrary = () => {

    }

    render() {
        return(
            <div className="searchBar">
                <input 
                    type="text"
                    value={this.handleChange}
                    placeholder="Search your music..."
                />
                <FontAwesome
                    name='search'
                    color='$smoke'
                    size={25}
                />
            </div>
        )
    }

}

export default Search