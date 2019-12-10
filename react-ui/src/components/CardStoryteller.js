import React, { Component } from 'react';
import '../App.scss';

export default class CardStoryteller extends Component {
  constructor(props) {    
    super(props)
    this.state = {
        error: null,
        isLoaded: false,
        items: [],
        cardImg:null,
        headline:'',
        subline:'',
        content:'',
      };

}
/*
componentDidMount() {
    fetch("http://www.randomtext.me/api/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items,



          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }*/
    render() { 
        return (
                <>
                  <div className="vein vein-inverted">
                    <div className="vein-header">
                        <div className="vein-topic">
                            <p>
                            {this.props.headline}
                            </p>
                        </div>
                    </div>
                    <img src="../assets/img/bgr_3" className=" " alt="" />
                    <div className="vein-content">
                        <div className="vein-title">
                            <p>
                            {this.props.subline}
                            </p>
                        </div>
                        <div className="vein-text">
                            <ul>
                            {this.props.content}
                            </ul>
                        </div>
                    </div>
                  </div>
                </>
                );
             }
}