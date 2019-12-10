import React, { Component } from 'react';
import '../App.scss';

export default class BranchDirectRow extends Component {
 
    render() { 
        return (
                <>
                  <div className="branch-row">
                  {this.props.children}  
                  </div>
                </>
                );
             }
}