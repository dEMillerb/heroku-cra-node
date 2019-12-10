import React, { Component } from 'react';
import '../App.scss';

export default class Root extends Component {
 
    render() { 
        return (
                <>
                  <div className="root">
                  {this.props.children}  
                  </div>
                </>
                );
             }
}