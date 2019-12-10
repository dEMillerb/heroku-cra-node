import React, { Component } from 'react';
import '../App.scss';

export default class Leaf extends Component {
 
    render() { 
        return (
                <>
                  <div className="leaf">
                  {this.props.children}  
                  </div>
                </>
                );
             }
}