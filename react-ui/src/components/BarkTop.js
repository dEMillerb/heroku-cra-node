import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../App.scss';




export default class BarkTop extends Component {
    

    render() { 
       
        return (
                <>
                  <header className="bark-top">
                      <ul className="content">
                        
            
                      <a href="http://www.thegreenbranch.de/about" target="_blank" rel="noopener noreferrer">
                              <li className=" border-l">
                                  <p className="">About</p>
                              </li>
                              </a>
                          <a href="http://www.thegreenbranch.de/ironlight" target="_blank" rel="noopener noreferrer">
                              <li className="">
                                  <p className="">Ironlight</p>
                              </li>
                              </a>
                          <a href="https://serene-badlands-47207.herokuapp.com/" target="_blank" rel="noopener noreferrer">
                              <li className="">
                                  <p className="">Storyteller</p>
                              </li>
                          </a>
                      </ul>
                      
                  </header>
                </>
                );
             }
}