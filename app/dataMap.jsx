// Main
import React from 'react';

// Third party packages
import { MapChoropleth } from 'react-d3-map-choropleth';

import crime from '../data/crimes_dom_beat.json';

// Data
import beats from '../data/chicago_beats.geo.json';

export default class DataMap extends React.Component {

    constructor(props){
        super(props);
        this.beats = beats;

        console.log(this.beats);

        this.width = 400;
        this.height = 600;

        this.crime = crime;

        for (var counter = 0; counter < this.crime.length; counter++) {
            var beatNum = this.crime[counter]["beat_num"];
            if (beatNum < 1000) {
              this.crime[counter]["beat_num"] = "0" + this.crime[counter]["beat_num"];
            } else {
              this.crime[counter]["beat_num"] = "" + this.crime[counter]["beat_num"] + "";
            }
        }

        // domain
        this.domain = {
            scale: 'quantize',
            domain: [0, 350],
            range: d3.range(10).map(function(i) { return "q" + i + "-10"; })
        };
        this.domainValue = function(d) {
            return d.crimes; 
        };
        this.domainKey = function(d) {
            return d.beat_num;
        };
        this.mapKey = function(d) {
            return d.beat_num;
        };

        this.scale = 10000;
        this.translate = [this.width / 2, this.height / 2];
        this.projection = 'mercator';
        this.center = [-87.690776, 41.830283];
    }

    componentDidMount(){
        console.log("Map mounted");
    }

    render(){
        return (
            <div className="map">
                <MapChoropleth
                  width= {this.width}
                  height= {this.height}
                  dataPolygon= {this.beats.features}
                  scale= {this.scale}
                  domain= {this.domain}
                  domainData= {this.crime}
                  domainValue= {this.domainValue}
                  domainKey= {this.domainKey}
                  mapKey = {this.mapKey}
                  projection= {this.projection}
                  center= {this.center}
                  showGraticule= {true}
                />
            </div>
        );
    }

}