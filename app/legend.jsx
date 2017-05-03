// Main
import React from 'react';

export default class Legend extends React.Component {

    constructor(props){
        super(props);
        // console.log("Component constructed");
        this.legend = [];
    }

    componentDidUpdate() {

        // console.log("Component updated");

    }

    componentDidMount(){

        // console.log("Component mounted");

    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        this.calculateLegend(nextProps);
    }

    calculateLegend(nextProps){
        // Determine the legend display
        var domain = nextProps.domain;

        var legend = [];
        // Determine start range
        if (domain[0] > 2) {
            legend.push(`1 - ${domain[0] - 1}`);
        } else {
            legend.push('1');
        }
        domain.map((value,i) => {
                if ( ((i + 1) < domain.length ) && ( value != ( domain[i + 1] - 1 ) ) ){
                    legend.push(`${value} - ${domain[i + 1] - 1}`);
                } else {
                    legend.push(`${value}`);
                }
            }
        )
        // Complete rest of range
        this.legend = legend;

    }

    render(){
        return (
            <div className="legend">
                <h4>Legend</h4>
                <ul>
                    {
                        this.props.data.map((value,i) =>
                                <li className="legend-item" key={i}>
                                    <span className="colorBox" style={{'backgroundColor': value}}></span>
                                    <span className="colorLabel">{ this.legend[i] }</span>
                                </li>
                            )
                    }
                </ul>
            </div>
        );
    }

}