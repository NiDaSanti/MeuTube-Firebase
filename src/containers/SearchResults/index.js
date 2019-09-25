import React from 'react';
import Results from '../../components/Results';

class ResultsPage extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <div className="results-page">
                <Results />
            </div>
        )
    }
}

export default ResultsPage;