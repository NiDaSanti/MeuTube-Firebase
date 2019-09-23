import React from 'react';
import { FontAwesome } from 'react-web-vector-icons';
import TrebleClef from '../../assets/images/trebleClef.png';

class AddMusic extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            library: this.props.library,
            item: {},
            song: "",
            artist: "",
            album: "",
            link: "",
        }
    }

    handleAddSong = (e) => {
        this.setState({
            song: e.target.value
        });
    }

    handleAddArtist = (e) => {
        this.setState({
            artist: e.target.value
        });
    }

    handleAddAlbum = (e) => {
        this.setState({
            album: e.target.value
        });
    }

    handleAddLink = (e) => {
        this.setState({
            link: e.target.value
        });
    }

    addMusicToLibrary = (e) => {
        let song = this.state.song;
        let artist = this.state.artist;
        let album = this.state.album;
        let link = this.state.link;
        const item = {
            song, artist, album, link
        }
        this.props.onAddMusicChange(item)
        this.setState({
            song: "",
            artist: "",
            album: "",
            link: ""
        });
    }

    render() {
        return(
            <div className="addMusic">
                <div className="backgroundImage">
                    <img src={TrebleClef} className="staff"></img>
                </div>
                
                <div className="addMusicInputs">
                <input
                    type="text"
                    name="song"
                    value={this.state.song}
                    onChange={this.handleAddSong}
                    placeholder="Song Title"
                /><br/>
                <input
                    type="text"
                    name="artist"
                    value={this.state.artist}
                    onChange={this.handleAddArtist}
                    placeholder="Artist"
                /><br/>
                <input
                    type="text"
                    name="album"
                    value={this.state.album}
                    onChange={this.handleAddAlbum}
                    placeholder="Album"
                /><br/>
                <input
                    type="text"
                    name="youTubeLink"
                    value={this.state.link}
                    onChange={this.handleAddLink}
                    placeholder="YouTube Link"
                /><br/>
                <button onClick={this.addMusicToLibrary} className="addButtonButton" type="button">
                <FontAwesome
                    name='plus-circle'
                    color='white'
                    size={35}
                    className="addButton"
                />
                </button>
                </div>

            </div>
        )
    }

}

export default AddMusic