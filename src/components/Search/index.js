import React from 'react'
import { FontAwesome } from 'react-web-vector-icons';

class Search extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchEntry: "",
            results: [],
        }
    }

    handleChange = (e) => {
        this.setState({
            searchEntry: e.target.value
        });
    }

    searchUserLibrary = () => {
        let searchEntry = this.state.searchEntry;
        const searchString = searchEntry;
        this.props.onSearchLibrary(searchString)
        this.setState({
            searchEntry: "",
        });
    }

    render() {
        // const isResults = this.state.results.length > 0

        return(
            <div className="searchBar">
                <input 
                    type="text"
                    name="searchString"
                    value={this.state.searchEntry}
                    onChange={this.handleChange}
                    placeholder="Search your music..."
                />
                <button onClick={this.searchUserLibrary} className="searchButtonButton">
                <FontAwesome
                    name='search'
                    color='white'
                    size={25}
                    className="searchButton"
                />
                </button>
               {/* {isResults && <Results results={this.state.results} length={this.state.results.length}/>} */}
                <br/>
            </div>
        )
    }

}

export default Search