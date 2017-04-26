import React from 'react';

export default class Footer extends React.Component {

    componentDidMount(){
        console.log("Footer mounted");
    }

    render(){
        return (
            <div className="footer">
                <p>{this.props.copyright}</p>
            </div>
        );
    }

}