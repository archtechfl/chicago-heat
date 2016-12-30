import ReactDOM from 'react-dom';
import React from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';
import RichTextBlock from './rich_text_block.jsx';

class BaseStation extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: "",
        }
    }

    componentDidMount(){
        console.log("Base mounted");
    }

    render(){
        return (
            <div>
                <Header greeting="Jeremy's First React from scratch"/>
                <RichTextBlock text="Hello, user! I've been expecting you."/>
                <Footer copyright="©2016-2017 Jeremy Moore. Licensed under MIT licence."/>
            </div>
        );
    }

}

// Render them
ReactDOM.render(<BaseStation />, document.getElementById('launchpad'));