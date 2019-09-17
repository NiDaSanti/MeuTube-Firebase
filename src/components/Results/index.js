import React from 'react'

class Results extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        const resultList = this.props.results
        const results = resultList.map((result) => {
            console.log("one result: ", result);
            for (var i = 0; i < resultList.length; i++) {
                const values = Object.values(result);
                const info = values.join(" | ")
                return <div>{info}</div>;
            }
        })
        return(
            <div>
                {results}
            </div>
        )
    }
}

export default Results