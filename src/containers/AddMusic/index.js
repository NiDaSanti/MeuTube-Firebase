import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class AddMusicPage extends Component {
    render() {
        return(
            <div>
                <Link to={ROUTES.ADD_MUSIC}> Add Music to your Library </Link>            
            </div>
        )
    }
}

export default AddMusicPage;