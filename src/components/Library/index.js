import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { FontAwesome } from 'react-web-vector-icons';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class Library extends Component {
    constructor(props){
        super(props);
        this.state= {
            library: [],
            libkey: "",
        }
    }

    componentDidMount() {
        this.props.firebase.library().on('value', snapshot => {
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

    render() {
        return(
            <div className="library">
                <LibraryList library={this.state.library} className="libraryList" />
            </div>
        )
    }
}

const LibraryList = ({ library }) => (
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
        {library.map(item => (
            <li key={item.libKey}>
                <div>
        <button className="playButtonButton" onClick={<Link to={ROUTES.MUSIC_PAGE} />}>
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
                {/* <span className="libLink">
                    {item.link}
                </span> */}
            </li>
        ))}
    </ul>
);

export default compose(withFirebase(Library));