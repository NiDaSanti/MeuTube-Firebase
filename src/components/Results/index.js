import React from 'react'

class Results extends React.Component {
    results = (props) => (
        props.results.map((result) => {
            console.log("result from mapping: ", result);
            return result;
        })
    )

    render() {
        let parsedResults = () => {
            let length = this.props.length;
            for (var i = 0; i < length; i++) {
                this.props.results.map((result) => {
                    return <div>{result}</div>
                })
            }
        }

        return(
            <div>
                {parsedResults()}
            </div>
        )
    }
}

export default Results