// Main
import React from 'react';

// Third party packages
import * as d3 from "d3";
import * as chroma from 'chroma-js';

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
            height: 800
        };
        this.crimesTypeListing = {
            "domestic_battery_simple": {
                "name": "Domestic Battery Simple", "data": domestic_battery_simple
            },
            "murder": {
                "name": "Murder", "data": murders
            }
        };
        this.viewingData = this.crimesTypeListing[this.state.crimes].data;

        for (var counter = 0; counter < this.viewingData.length; counter++) {
            var beatNum = this.viewingData[counter]["beat_num"];
            if (beatNum < 1000) {
              this.viewingData[counter]["beat_num"] = "0" + this.viewingData[counter]["beat_num"];
            } else {
              this.viewingData[counter]["beat_num"] = "" + this.viewingData[counter]["beat_num"] + "";
            }
        }

        var amountCrimePerBeat = {};

        this.viewingData.forEach(function(d) { 
          amountCrimePerBeat[d["beat_num"]] = d["crimes"];
        });

        this.amountCrimePerBeat = amountCrimePerBeat;

        console.log("Component constructed");
    }

    componentDidUpdate() {

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

        this.amountCrimePerBeat = amountCrimePerBeat;

        // Get list of crime numbers
        var crimeNumbers = Object.keys(amountCrimePerBeat).map(function(key) {
           return amountCrimePerBeat[key];
        });

        var max = Math.max(...crimeNumbers);
        var min = Math.min(...crimeNumbers);

        // Create range
        var steps = (max - min) / 10;

        var domain = [0];

        for (counter = 0; counter <= max; counter++){
            domain.push(Math.ceil(min + (steps * counter)));
        }

        // var test = chroma.scale(['lightyellow', 'red']).domain([min, max], ( domain.length + 1) );

        // console.log(test);

        var colorScale = d3.scaleThreshold()
            .domain([0,1,2,3,4,5,6,7,8,9])
            .range(['#ffffe0','#ffeecc','#ffdeb8','#ffcba3','#ffba8f','#ffa77a','#ff9467','#ff7e51','#ff663c','#ff4723','#ff0000']);

        this.svg = d3.select("#mapArea svg");

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

        console.log("Component updated");

    }

    componentDidMount(){

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
            .domain([35, 70, 105, 140, 175, 210, 245, 280, 315, 350])
            .range(['#ffffe0','#ffeecc','#ffdeb8','#ffcba3','#ffba8f','#ffa77a','#ff9467','#ff7e51','#ff663c','#ff4723','#ff0000']);

        // Update the projection    
        projection
          .scale(s)
          .translate(t);

        this.svg = d3.select("#mapArea svg");

        var amountCrimePerBeat = this.amountCrimePerBeat;

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

        console.log("Component mounted");

    }

    selectData(crimeKey){

        if (crimeKey !== this.state.crimes) {
            this.setState({"crimes": crimeKey});
        }

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