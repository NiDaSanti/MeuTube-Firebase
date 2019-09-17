import React from 'react'
import { FontAwesome } from 'react-web-vector-icons';

import Results from '../Results';

class Search extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            exampleLibrary: [
               {song: "ABC",
                artist: "Jackson 5",
                album: "Unknown",
                youTubeLink: "https://youtu.be/64n-t9Sw7F0"},
               {song: "Borderline",
                artist: "Madonna",
                album: "Unknown",
                youTubeLink: "https://youtu.be/rSaC-YbSDpo"},
               {song: "We Will Rock You",
                artist: "Queen",
                album: "Unknown",
                youTubeLink: "https://youtu.be/-tJYN-eG1zk"},
               {song: "Bohemian Rhapsody",
                artist: "Queen",
                album: "Unknown",
                youTubeLink: "https://youtu.be/fJ9rUzIMcZQ"},
            ],
            searchEntry: "",
            results: [],
            addedItem: {},
            addedSong: "",
            addedArtist: "",
            addedAlbum: "",
            addedYouTubeLink: "",
        }
    }

    handleChange = (e) => {
        this.setState({
            searchEntry: e.target.value
        });
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

    filterIt = (library, searchEntry) => {
        return library.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchEntry)));
    }

    searchUserLibrary = () => {
        let library = this.state.exampleLibrary;
        let searchEntry = this.state.searchEntry;
        console.log("result: ", this.filterIt(library, searchEntry));
        const results = this.filterIt(library, searchEntry);
        this.setState({
            results: results
        });
    }

    addMusicToLibrary = (e) => {
        let addedSong = this.state.addedSong;
        let addedArtist = this.state.addedArtist;
        let addedAlbum = this.state.addedAlbum;
        let addedLink = this.state.addedYouTubeLink;
        this.setState({
            addedSong: addedSong,
            addedArtist: addedArtist,
            addedAlbum: addedAlbum,
            addedYouTubeLink: addedLink
        });
        this.pushMusicToLibrary();
    }

    pushMusicToLibrary = () => {
        const entered = {
            song: this.state.addedSong,
            artist: this.state.addedArtist,
            album: this.state.addedAlbum,
            link: this.state.addedYouTubeLink,
        };
        const itemObject = Object.assign(entered);
        let library = this.state.exampleLibrary;
        library.push(itemObject);
    }

    render() {
        const isResults = this.state.results.length > 0
        console.log(this.state.results);
        console.log("library: ", this.state.exampleLibrary);

        return(
            <div className="teastinJSXfx">

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
                    color='black'
                    size={25}
                    className="searchButton"
                />
                </button>
               {isResults && <Results results={this.state.results} length={this.state.results.length}/>}
                <br/>
            </div>
            </div>
        )
    }

}

export default Search