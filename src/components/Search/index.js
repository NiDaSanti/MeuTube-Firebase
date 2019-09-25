import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { FontAwesome } from 'react-web-vector-icons';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            authUser: JSON.parse(localStorage.getItem('authUser')),
            searchEntry: "",
            library: [],
            libKey: "",
        }
    }

    componentDidMount() {
        this.props.firebase.library().orderByChild('uid').equalTo(this.state.authUser.uid).on('value', snapshot => {
            const libraryObject = snapshot.val();
            if (libraryObject === null) {
                return
            } else {
            const libraryList = Object.keys(libraryObject).map(key => ({
                ...libraryObject[key],
                libKey: key,
            }));
            this.setState({
                library: libraryList,
            });}
        });
    }

    

    // routeToResults = () => {
    //     const resultsUrl = '/results-page/';
    //     this.props.history.push(resultsUrl);
    // } 

    render() {
        // const isResults = this.state.results.length > 0
        let searchEntry = this.state.searchEntry;
        return(
            <div className="searchBar">
                <input 
                    type="text"
                    name="searchString"
                    value={this.state.searchEntry}
                    onChange={this.handleChange}
                    placeholder="Search your music..."
                    className="searchInput"
                />
                <button 
                    onClick={() => this.routeToResults(searchEntry)} 
                    className="searchButtonButton"
                >
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

export default compose(
    withRouter,
    withFirebase)(Search)
;