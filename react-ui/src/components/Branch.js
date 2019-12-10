import React, { Component } from 'react';
import '../App.scss';

export default class Branch extends Component {
 
    render() { 
        return (
          
                  <div className="branch">
                  {this.props.children}  
                  </div>
              
                );
             }
}