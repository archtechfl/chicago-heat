// Main
import React from 'react';

export default class Legend extends React.Component {

    constructor(props){
        super(props);
        console.log("Component constructed");
        console.log(props);
    }

    componentDidUpdate() {

        console.log("Component updated");

    }

    componentDidMount(){

        console.log("Component mounted");

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    render(){
        return (
            <div className="legend">
                <h4>Legend</h4>
                <ul>
                    {
                        this.props.data.map((value,i) =>
                                <li className="legend-item" key={i} style={{'backgroundColor': value}}></li>
                            )
                    }
                </ul>
            </div>
        );
    }

}