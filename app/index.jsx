import ReactDOM from 'react-dom';
import React from 'react';

import Header from './header.jsx';
import Footer from './footer.jsx';
import DataMap from './dataMap.jsx';


class BaseStation extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        // console.log("Base mounted");
    }

    render(){
        return (
            <div>
                <Header greeting="Chicago data visualization using D3 and R Lang"/>
                <DataMap/>
                <Footer copyright="©2017 Jeremy Moore."/>
            </div>
        );
    }

}

// Render them
ReactDOM.render(<BaseStation />, document.getElementById('launchpad'));