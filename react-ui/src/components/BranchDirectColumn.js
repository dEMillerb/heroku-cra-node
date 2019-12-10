import React, { Component } from 'react';
import '../App.scss';

export default class BranchDirectColumn extends Component {
 
    render() { 
        return (
                <>
                  <div className="branch-column active">
                  {this.props.children}  
                  </div>
                </>
                );
             }
}