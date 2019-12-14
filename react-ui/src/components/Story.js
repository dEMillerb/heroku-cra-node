import React, { Component } from 'react';
import '../App.scss';
import editIcon from '../assets/icon/edit.svg'
import deleteIcon from '../assets/icon/delete.svg'

export default class Story extends Component {
    constructor(props) {    
        super(props);
    
        this.state = {
            mapKey:[],
            StoryItem:[],
            onClickEdit:{},
            onClickDelete:[],
            valueEditarea:[],
            handleChange:{},
            editOn:false,
          };
          this.handleChange = this.handleChange.bind(this);
          this.toggleEditMenu = this.toggleEditMenu.bind(this);
      }
//Handler
toggleEditMenu(){
    const currentState = this.state.editOn;
    this.setState({ editOn: !currentState });
  }
  handleChange(event) {
  this.setState({valueEditarea: event.target.value});
  }
  //Requests
  deleteStory(item) {
      console.log("Delete Story")
      console.log(item)
      fetch("/api/story/" + item, {  
        method: 'DELETE',
        //headers: {'Accept': 'application/json','Content-Type': 'application/json'},
        //body: JSON.stringify({ "item": this.state.stories}),
    })
        .then(response => {
          if (!response.ok) {
            throw new Error(`status ${response.status}`);
          }
          return response.json();
          
        })
        .then(json => {
          let story = this.state.stories.filter(stories =>{
            return stories.item !== item
          });
          this.setState({
            stories: story
          });
        })
        .catch(e => {
    
        })
    }

//----------------------------------------------------
    render() { 
        const editOn = this.state.editOn ? '' : 'editOff';
        return (
                <>
                <li key={this.props.mapKey}> 
                    <p>{this.props.StoryItem} </p>
                    <div className="interaction">
                        <div className="icon">
                
                        <img src={editIcon} onClick={() => {this.toggleEditMenu()}} className={` ${editOn}`} alt="go"/>

                        </div>
                        <div className="icon">
                        <img onClick={() => {this.deleteStory(this.props.onClickDelete)}} src={deleteIcon} alt="go"/> 
                        </div>
                    </div>
                    </li>
                    <div className="interaction">
                    <div className={`edit ${editOn}`}>
                        <textarea type="text" name="edit" placeholder="I missunderstood you? What is it you want to update?" value={this.state.valueEditarea} onChange={this.handleChange} />
                        <div className="icon-bgr">
                        <img className="icon" src={editIcon}  alt="go"/>
                        </div>
                    </div>
                    </div>
                </>
                );
             }
}