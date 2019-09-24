import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { FontAwesome } from 'react-web-vector-icons';


class Library extends Component {
    constructor(props){
        super(props);
        this.state= {
            authUser: JSON.parse(localStorage.getItem('authUser')),
            library: [],
            libkey: "",
            userLibrary: [],
        }
    }

    componentDidMount() {
        console.log(this.state.authUser);
        this.props.firebase.library().orderByChild('uid').equalTo(this.state.authUser.uid).on('value', snapshot => {
        const libraryObject = snapshot.val();

        const libraryList = Object.keys(libraryObject).map(key => ({
            ...libraryObject[key],
            libKey: key,
        }));

      this.setState({
        library: libraryList,
      });
    });
    }

    routeToSong = (item) => {
        console.log("item is: ", item);
        const baseUrl = '/music-page/' + item.libKey;
        this.props.history.push(baseUrl);
        
    }

    render() {
        const library = this.state.library;
        // const libraryList = library.orderByChild('uid').equalTo(this.state.authUser).map(item => {
        const libraryList = library.map(item => {
            return (
                <li key={item.libKey}>
                    {/* <Link to={"/music-page/" + item.libKey}> Link </Link> */}
                                 <div>
                                    <button 
                                        className="playButtonButton"
                                        onClick={() => this.routeToSong(item)}
                                    >
                                        <FontAwesome
                                            name="play-circle"
                                            color='white'
                                            size={30}
                                            className="playButton"
                                        />
                                    </button>
                                </div>
                                <div className="libSong">
                                    {item.song}
                                </div>
                                <div className="libArtist">
                                    {item.artist}
                                </div>
                                <div className="libAlbum">
                                    {item.album}
                                </div>
                            </li>
            )
        })


        return(
            <div className="library">
                  <ul className="libraryList">
                        <li>
                            <div className="libSong">
                                <strong>Song Title</strong>
                            </div>
                            <div className="libArtist">
                                <strong>Artist</strong>
                            </div>
                            <div className="libAlbum">
                                <strong>Album</strong>
                            </div>
                        </li>
                    {libraryList}
                  </ul>
            </div>
        )
    }
}

export default compose(
    withRouter, 
    withFirebase)(Library)
;