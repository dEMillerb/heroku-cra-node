import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../App.scss';




export default class BarkTop extends Component {
    

    render() { 
       
        return (
                <>
                  <header className="bark-top">
                      <ul className="content">
                        
            
                          <Link to='/dashboard'>
                              <li className=" border-l">
                                  <p className="">About</p>
                              </li>
                          </Link>
                          <Link to='/ironlight'>
                              <li className="">
                                  <p className="">Ironlight</p>
                              </li>
                          </Link>
                          <a href="https://serene-badlands-47207.herokuapp.com/">
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