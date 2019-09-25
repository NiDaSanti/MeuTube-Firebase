// import React from 'react';
// import { compose } from 'recompose';
// import { withFirebase } from '../Firebase';
// import { FontAwesome } from 'react-web-vector-icons';
// import { Link } from 'react-router-dom';

// class Results extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             authUser: JSON.parse(localStorage.getItem('authUser')),
//             library: [],
//             searchEntry: "Dave",
//             results: [],
//         };
//     }

//     componentDidMount() {
//         this.props.firebase.library().orderByChild('uid').equalTo(this.state.authUser.uid).on('value', snapshot => {
//             const libraryObject = snapshot.val();
//             if (libraryObject === null) {
//                 return
//             } else {
//             const libraryList = Object.keys(libraryObject).map(key => ({
//                 ...libraryObject[key],
//                 libKey: key,
//             }));
//             this.setState({
//                 library: libraryList,
//                 //searchEntry: this.props.searchEntry,
//             });}
//         });
//     }

    

//     render() {
//         console.log("hard coded: ", this.state.searchEntry);
//         const resultsList = this.filterResults();
        

//             // return (
//             //     <li key={item.libKey}>
//             //         {/* <Link to={"/music-page/" + item.libKey}> Link </Link> */}
//             //         <div>
//             //             <button 
//             //                 className="playButtonButton"
//             //                 onClick={() => this.routeToSong(item)}
//             //             >
//             //                 <FontAwesome
//             //                     name="play-circle"
//             //                     color='white'
//             //                     size={30}
//             //                     className="playButton"
//             //                 />
//             //             </button>
//             //         </div>
//             //         <div className="libSong">
//             //             {item.song}
//             //         </div>
//             //         <div className="libArtist">
//             //             {item.artist}
//             //         </div>
//             //         <div className="libAlbum">
//             //             {item.album}
//             //         </div>
//             //         <div>
//             //             <button 
//             //                 className="delButtonButton"
//             //                 onClick={() => this.deleteSong(item)}
//             //             >
//             //                 <FontAwesome
//             //                     name="trash-o"
//             //                     color='white'
//             //                     size={30}
//             //                     className="delButton"
//             //                 />
//             //             </button>
//             //         </div>
//             //     </li>
//             // )
//         // });
//         // const resultList = this.state.library;
//         // const results = resultsList.map((result) => {
//             // console.log("one result: ", result);
//             // for (var i = 0; i < resultsList.length; i++) {
//             //     const values = Object.values(result);
//             //     const info = values.join(" | ")
//             //     return <div>{info}<hr/></div>;
//             // }
//         // })

//         return(
//             <div className="resultsList">
//                 {}
//                 {/* You had no results to your search, so here is your full music library:*/}
//                 {resultsList} 
//             </div>
//         )
//     }
// }

// export default compose(withFirebase)(Results);

