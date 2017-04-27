// Main
import React from 'react';

// Third party packages
import * as d3 from "d3";

import domestic_battery_simple from '../data/crimes_dom_beat.json';
import murders from '../data/crimes_murder_beat.json';

// Data
import beats from '../data/chicago_beats.geo.json';

export default class DataMap extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            crimes: "domestic_battery_simple",
            width: 800,
            height: 800,
            viewingData: []
        };
        this.crimesTypeListing = {
            "domestic_battery_simple": {
                "name": "Domestic Battery Simple", "data": domestic_battery_simple
            },
            "murder": {
                "name": "Murder", "data": murders
            }
        };
        this.state.viewingData = this.crimesTypeListing[this.state.crimes].data;

        for (var counter = 0; counter < this.state.viewingData.length; counter++) {
            var beatNum = this.state.viewingData[counter]["beat_num"];
            if (beatNum < 1000) {
              this.state.viewingData[counter]["beat_num"] = "0" + this.state.viewingData[counter]["beat_num"];
            } else {
              this.state.viewingData[counter]["beat_num"] = "" + this.state.viewingData[counter]["beat_num"] + "";
            }
        }

        var amountCrimePerBeat = {};

        this.state.viewingData.forEach(function(d) { 
          amountCrimePerBeat[d["beat_num"]] = d["crimes"];
        });

        this.state.amountCrimePerBeat = amountCrimePerBeat;

        console.log("Component constructed");
    }

    componentDidUpdate() {

        console.log(this.state);

        console.log("Component updated");

        var viewingData = this.crimesTypeListing[this.state.crimes].data;

        for (var counter = 0; counter < viewingData.length; counter++) {
            var beatNum = viewingData[counter]["beat_num"];
            if (beatNum < 1000) {
              viewingData[counter]["beat_num"] = "0" + viewingData[counter]["beat_num"];
            } else {
              viewingData[counter]["beat_num"] = "" + viewingData[counter]["beat_num"] + "";
            }
        }

        var amountCrimePerBeat = {};

        viewingData.forEach(function(d) { 
          amountCrimePerBeat[d["beat_num"]] = d["crimes"];
        });

        this.state.amountCrimePerBeat = amountCrimePerBeat;

        // Get data bounds
        var max = amountCrimePerBeat.reduce((prev, current) => (prev.crimes > current.crimes) ? prev : current);
        console.log(max);

        var colorScale = d3.scaleThreshold()
            .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .range(['#DBDBDB','#ffffff','#fff1a1','#ffe075','#ffcb55','#ffb73c','#ffa127','#ff8815','#ff6d05','#ff4b00','#ff0000']);

        this.svg = d3.select("#mapArea svg");

        var amountCrimePerBeat = this.state.amountCrimePerBeat;

        this.svg.selectAll("path")          
                    .attr("fill", function(d) { 
                        var noDataColor = "#DBDBDB";
                        var color = colorScale(amountCrimePerBeat[d["properties"]["beat_num"]]);
                        if (!color) {
                            return noDataColor;
                        } else {
                            return color;
                        }
                    });

    }

    componentDidMount(){

        console.log("Component mounted");

        // Get geographic data
        var geoJsonObj = beats;

        //Define map projection
        var projection = d3.geoMercator()
                               .translate([0, 0])
                               .scale(1);

        //Define path generator
        var path = d3.geoPath()
                         .projection(projection);

        var b = path.bounds( geoJsonObj ),
                        s = .95 / Math.max((b[1][0] - b[0][0]) / this.state.width, (b[1][1] - b[0][1]) / this.state.height),
                        t = [(this.state.width - s * (b[1][0] + b[0][0])) / 2, (this.state.height - s * (b[1][1] + b[0][1])) / 2];

        var colorScale = d3.scaleThreshold()
            .domain([0, 35, 70, 105, 140, 175, 210, 245, 280, 315, 350])
            .range(['#DBDBDB','#FEFFEB','#ffedca','#ffd9b3','#ffc69c','#ffb186','#ff9d70','#ff8659','#ff6b40','#ff4a26','#ff0000']);

        // Update the projection    
        projection
          .scale(s)
          .translate(t);

        this.svg = d3.select("#mapArea svg");

        var amountCrimePerBeat = this.state.amountCrimePerBeat;

        this.svg.append("g")
                    .selectAll("path")
                    .data(geoJsonObj.features)
                    .enter().append("path")            
                    .attr("fill", function(d) {
                        var noDataColor = "#DBDBDB";
                        var color = colorScale(amountCrimePerBeat[d["properties"]["beat_num"]]);
                        if (!color) {
                            return noDataColor;
                        } else {
                            return color;
                        }
                    })
                    .attr("d", path)
                    .attr("id", function(d, i) { return geoJsonObj.features[i].properties.beat_num; });

    }

    selectData(crimeKey){

        this.setState({"crimes": crimeKey}); 

    }

    render(){
        return (
            <div className="map">
                <div id="dataBrowser">
                    <ul>
                    {
                        Object.keys(this.crimesTypeListing).map((crime_name,i) =>
                            <li key={i} onClick={this.selectData.bind(this, crime_name)}>{this.crimesTypeListing[crime_name].name}</li>
                        )
                    }
                    </ul>
                </div>
                <div id="mapArea">
                    <svg width={ this.state.width } height={ this.state.height }></svg>
                </div>
            </div>
        );
    }

}