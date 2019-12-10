import React, { Component } from 'react';
import '../App.scss';

export default class BranchDirectColumn extends Component {
 
    render() { 
        return (
                <>
                  <div className="branch-column">
                  {this.props.children}  
                  </div>
                </>
                );
             }
}