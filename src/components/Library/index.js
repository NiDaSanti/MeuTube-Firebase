import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { FontAwesome } from 'react-web-vector-icons';
import AddMusic from '../AddMusic';


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

    addMusicChange = (item) => {
        const song = item.song;
        const artist = item.artist;
        const album = item.album;
        const link = item.link;
        const uid = this.state.authUser.uid;
        this.props.firebase.library().push({ song, artist, album, link, uid })
      }

    routeToSong = (item) => {
        console.log("item is: ", item);
        const baseUrl = '/music-page/' + item.libKey;
        this.props.history.push(baseUrl);
    }

    deleteSong = (item) => {
        const library = this.props.firebase.library();
        console.log(item);
        library.child(item.libKey).remove();
    }

    render() {
        const library = this.state.library;
        console.log("Library is: ", library);
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
                        <div>
                            <button 
                                className="delButtonButton"
                                onClick={() => this.deleteSong(item)}
                            >
                                <FontAwesome
                                    name="trash-o"
                                    color='white'
                                    size={30}
                                    className="delButton"
                                />
                            </button>
                        </div>
                    </li>
                )
            });

            return(
              <div>
                <div className="addMusic">
                    <h2>Add Music to your Library:</h2>
                    <AddMusic 
                    onAddMusicChange={this.addMusicChange}
                    />
                </div>
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
              </div>
            )
    }
}

export default compose(
    withRouter, 
    withFirebase)(Library)
;