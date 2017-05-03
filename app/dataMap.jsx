// Main
import React from 'react';

// Third party packages
import * as d3 from "d3";
import * as chroma from 'chroma-js/chroma.js';

// Crimes
import { primary_types } from '../data/primary_types';
import { by_description } from '../data/by_description';

// Legend
import Legend from './legend.jsx';

// Data
import beats from '../data/chicago_beats.geo.json';

export default class DataMap extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            crimes: "",
            width: 800,
            height: 800,
            crimeCount: 0,
            crimeBeat: "",
            currentRange: [],
            domain: [],
            amountCrimePerBeat: {}
        };

        this.crimesTypeListing = {};

        this.primary_crimes = primary_types;

        this.by_description = by_description;

        Object.keys(this.primary_crimes).map((crime_name,i) => {
                this.crimesTypeListing[crime_name] = this.primary_crimes[crime_name]
            }
        );

        Object.keys(this.by_description).map((crime_name,i) => {
                this.crimesTypeListing[crime_name] = this.by_description[crime_name]
            }
        );

        console.log("Component constructed");
    }

    getCrimesKeyedToDivisions(data) {
        // Convert the array of crime statistic objects to a single object with crimes keyed
        // to their associated police beat ID
        var amountCrimePerBeat = {};

        data.forEach(function(d) { 
          amountCrimePerBeat[d["beat_num"]] = d["crimes"];
        });

        return amountCrimePerBeat;

    }

    componentDidUpdate() {

        // Update SVG

        this.generateSVG(false, null, this.state.colorScale, this.state.amountCrimePerBeat);

        console.log("Component updated");

    }

    componentDidMount(){

        // Get geographic data
        var geoJsonObj = beats;

        var colorScale = this.getColorScale(0, 0);

        this.generateSVG(true, geoJsonObj, colorScale["colorScale"], {});

        console.log("Component mounted");

    }

    selectData(crimeKey){

        // Called when data set is toggled, triggers re-rendering process

        if (crimeKey !== this.state.crimes) {

            $("#mapArea svg path").removeClass("active");

            var endpoint = `../data/${this.crimesTypeListing[crimeKey]["file_name"]}`;

            fetch(endpoint)
              .then(blob => blob.json())
              .then(data => this.prepareForUpdate(data, crimeKey));

        }

    }

    prepareForUpdate(viewingData, crimeKey){

        var amountCrimePerBeat = this.getCrimesKeyedToDivisions(viewingData);

        var crimeBounds = this.getDataBounds(amountCrimePerBeat);

        var max = crimeBounds["max"];
        var min = crimeBounds["min"];

        var colorScale = this.getColorScale(min, max);

        this.setState({
            "crimes": crimeKey,
            "currentRange": colorScale.currentRange,
            "domain": colorScale.domain,
            "colorScale": colorScale.colorScale,
            "amountCrimePerBeat": amountCrimePerBeat,
            "crimeCount": 0,
            "crimeBeat": ""
        });
    }

    generateSVG(initial, geoData, colorScale, crimeData) {
        // Visualize the data
        // During initial setup, the SVG must be drawn and the geographic divisions supplied with data
        // When switching to another data set, only the path colors and associated metadata needs to be updated,
        // no need to redraw the SVG again

        this.svg = d3.select("#mapArea svg");

        if (initial) {

            //Define map projection
            var projection = d3.geoMercator()
                                   .translate([0, 0])
                                   .scale(1);

            //Define path generator
            var path = d3.geoPath()
                             .projection(projection);

            var b = path.bounds( geoData ),
                            s = .95 / Math.max((b[1][0] - b[0][0]) / this.state.width, (b[1][1] - b[0][1]) / this.state.height),
                            t = [(this.state.width - s * (b[1][0] + b[0][0])) / 2, (this.state.height - s * (b[1][1] + b[0][1])) / 2];

            // Update the projection to center the rendered city map in the SVG
            projection
              .scale(s)
              .translate(t);

            this.svg.append("g")
                        .selectAll("path")
                        .data(geoData.features)
                        .enter().append("path")            
                        .attr("fill", function(d) {
                            let noDataColor = "#DBDBDB";
                            let colorData = crimeData[d["properties"]["beat_num"]];
                            if (!colorData) {
                                return noDataColor;
                            } else {
                                return colorScale(colorData);
                            }
                        })
                        .attr("d", path)
                        .attr("id", function(d, i) { return geoData.features[i].properties.beat_num; })
                        .attr("data-value", function(d, i) {
                            var value = crimeData[d["properties"]["beat_num"]];
                            if (value) {
                                return value;
                            } else {
                                return 0;
                            }
                        });
        } else {

            this.svg.selectAll("path")          
                    .attr("fill", function(d) { 
                        let noDataColor = "#DBDBDB";
                        let colorData = crimeData[d["properties"]["beat_num"]];
                        if (!colorData) {
                            return noDataColor;
                        } else {
                            return colorScale(colorData);
                        }
                    })
                    .attr("data-value", function(d, i) { 
                        var value = crimeData[d["properties"]["beat_num"]];
                        if (value) {
                            return value;
                        } else {
                            return 0;
                        }
                    });
        }
    }

    getColorScale(min, max){
        // Retrieve a color scale based on the number of thresholds in the dataset, ranging from lightyellow
        // to purple
        var steps = (max - min) / 10;

        var domain = [Math.ceil(min + (steps * 1))];

        for (var counter = 1; counter < 10; counter++){
            var currentVal = Math.ceil(min + (steps * (counter + 1)));
            // Current domain length
            var lastIndex = domain.length - 1;
            if (currentVal !== domain[lastIndex]) {
                domain.push(currentVal); 
            }
        };

        let domain_length = 0;
        var colorRange = [];

        // Length to send
        // If there is only one data point, only need to send one color
        // chroma.scale returns single color as string so need to maintain as array
        if (domain.length < 2) {
            domain_length = 1;
            colorRange = chroma.scale(['lightyellow', 'lightyellow']).colors(domain_length);
            colorRange = [colorRange];
        } else {
            domain_length = domain.length + 1;
            colorRange = chroma.scale(['lightyellow', 'orange', 'red', 'purple']).colors(domain_length);
        }

        var colorScale = d3.scaleThreshold()
            .domain([...domain])
            .range([...colorRange]);

        return {
            "colorScale": colorScale,
            "domain": domain,
            "currentRange": colorRange
        };
    }

    getDataBounds(crimesPerBeat) {
        // Get the min and max crime counts in the data sets
        var crimeNumbers = Object.keys(crimesPerBeat).map(function(key) {
           return crimesPerBeat[key];
        });
        let max = Math.max(...crimeNumbers);
        let min = Math.min(...crimeNumbers);
        return {
            "min": min,
            "max": max
        }
    }

    clickOnBeat(event) {
        // Change the data display to the current selected area
        if (event.target.id) {
            $("#mapArea svg path").removeClass("active");
            $(event.target).addClass("active");
            if (event.target.dataset.value){
                this.setState({
                    "crimeCount": event.target.dataset.value,
                    "crimeBeat": event.target.id
                });
            }
        }
    }

    render(){
        return (
            <div className="map">
                <div id="dataBrowser">
                    <h3>Primary types</h3>
                    <ul>
                    {
                        Object.keys(this.primary_crimes).map((crime_name,i) =>
                            <li className={crime_name == this.state.crimes ? "active" : ""} key={i} onClick={this.selectData.bind(this, crime_name)}>{this.crimesTypeListing[crime_name].name}</li>
                        )
                    }
                    </ul>
                    <h3>By description</h3>
                    <ul>
                    {
                        Object.keys(this.by_description).map((crime_name,i) =>
                            <li className={crime_name == this.state.crimes ? "active" : ""} key={i} onClick={this.selectData.bind(this, crime_name)}>{this.crimesTypeListing[crime_name].name}</li>
                        )
                    }
                    </ul>
                </div>
                <div className="mapWrapper">
                    <h3 className="current-crime">{this.state.crimes ? this.crimesTypeListing[this.state.crimes].name : "None selected"}</h3>
                    <div id="mapArea">
                        <svg width={ this.state.width } height={ this.state.height } onClick={this.clickOnBeat.bind(this)}></svg>
                    </div>
                    <div className="data-display">
                        <div>{`Beat: ${this.state.crimeBeat}`}</div>
                        <div>{`Crimes: ${this.state.crimeCount}`}</div>
                        {
                            <Legend data={this.state.crimes ? this.state.currentRange : []} domain={this.state.crimes ? this.state.domain : []}/>
                        }
                    </div>
                </div>
            </div>
        );
    }

}