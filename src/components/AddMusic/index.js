import React from 'react';
import { FontAwesome } from 'react-web-vector-icons';

class AddMusic extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            addedItem: {},
            addedSong: "",
            addedArtist: "",
            addedAlbum: "",
            addedYouTubeLink: "",
        }
    }

    handleAddSong = (e) => {
        this.setState({
            addedSong: e.target.value
        });
    }

    handleAddArtist = (e) => {
        this.setState({
            addedArtist: e.target.value
        });
    }

    handleAddAlbum = (e) => {
        this.setState({
            addedAlbum: e.target.value
        });
    }

    handleAddLink = (e) => {
        this.setState({
            addedYouTubeLink: e.target.value
        });
    }

    addMusicToLibrary = (e) => {
        let addedSong = this.state.addedSong;
        let addedArtist = this.state.addedArtist;
        let addedAlbum = this.state.addedAlbum;
        let addedLink = this.state.addedYouTubeLink;
        const song = {
            addedSong, addedArtist, addedAlbum, addedLink
        }
        this.props.onAddMusicChange(song)
        this.setState({
            addedSong: "",
            addedArtist: "",
            addedAlbum: "",
            addedYouTubeLink: ""
        });
    }

    render() {
        return(
            <div className="addMusic">
                <input
                    type="text"
                    name="song"
                    value={this.state.addedSong}
                    onChange={this.handleAddSong}
                    placeholder="Song Title"
                /><br/>
                <input
                    type="text"
                    name="artist"
                    value={this.state.addedArtist}
                    onChange={this.handleAddArtist}
                    placeholder="Artist"
                /><br/>
                <input
                    type="text"
                    name="album"
                    value={this.state.addedAlbum}
                    onChange={this.handleAddAlbum}
                    placeholder="Album"
                /><br/>
                <input
                    type="text"
                    name="youTubeLink"
                    value={this.state.addedYouTubeLink}
                    onChange={this.handleAddLink}
                    placeholder="YouTube Link"
                /><br/>
                <button onClick={this.addMusicToLibrary} className="addButtonButton" type="button">
                <FontAwesome
                    name='plus-circle'
                    color='white'
                    size={35}
                    className="addButton"
                    onClick={this.addMusicToLibrary}
                />
                </button>

            </div>
        )
    }

}

export default AddMusic