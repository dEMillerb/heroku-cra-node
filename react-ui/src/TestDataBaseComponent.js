import React, {Component} from 'react';
import Branch from './components/Branch';
import BranchDirectRow from './components/BranchDirectRow';
import BranchDirectColumn from './components/BranchDirectColumn';
import Leaf from './components/Leaf';
import CardStoryteller from './components/CardStoryteller';
import DeletIcon from './assets/icon/delete.svg'
import EditIcon from './assets/icon/edit.svg'


export default class TestDataBaseComponent extends Component {
  constructor(props) {    
    super(props);

    this.editBtn = React.createRef();
    this.editArea = React.createRef();
    this.state = {
        error: null,
        isLoaded: false,
        stories: [],
        valueTextarea:[],
        valueEditarea:'',
        editOn:false,
        //editBtn: React.createRef()
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.toggleEditMenu = this.toggleEditMenu.bind(this);

  }

componentDidMount() {
  this.getStory()
  this.interval = setInterval(() => this.getStory(), 15000);
}
//-----------------------------------------------------------------------------------------------

//Handler
handleChange(event) {
  this.setState({valueTextarea: event.target.value});
}

handleSubmit(event) {
  this.postStory();
  event.preventDefault();
} 
/*
toggleEditMenu(index){
    this.setState({ editOn: index }, () => { 
    console.log(index) 
  })

}*/
toggleEditMenu(i){
    const currentState = this.state.editOn;
    const currentBtn = this.editBtn.current;
    if (currentBtn.id == i){
      console.log('currentBtn.id' + ':' + currentBtn.id + '-' + 'index' + ':' + i)
      this.setState({ editOn: !currentState });
    }
    
    console.log('i' + ' ' + i)
    console.log('currentBtn.id' + ' ' + currentBtn.id)
    
  
  //console.log('index' + ' ' + id)
}
handleEdit(event) {
  this.setState({valueEditarea: event.target.value});
}
//Requests
getStory() {
  console.log("Recaping Story")
  fetch("/api/story")
    .then(response => {
      if (!response.ok) {
        throw new Error(`status ${response.status}`);
      }
      return response.json();
    })
    .then(json => {

      console.log(json)
      
    this.setState({
      stories : json.storys
    });

    }).catch(e => {

    })
}

postStory() {
  console.log("Post Story")
  fetch("/api/story", {  
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ "item": this.state.valueTextarea}),
})
    .then(response => {
      if (!response.ok) {
        throw new Error(`status ${response.status}`);
      }
      return response.json();
      
    })
    .then(json => {
      this.setState({
        valueTextarea : []
      });
      
      console.log(json)
     
    }).catch(e => {

    })
}

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

//-----------------------------------------------------------------------------------------------


//Render FrontEnd with Data
render() {    
  const editOn = this.state.editOn ? '' : 'editOff';
    return (
      <>
      <BranchDirectColumn>
        <BranchDirectRow>
          <Branch>  
          <Leaf>
            <CardStoryteller 
            headline="Chapter: One"
            subline="Rebuilding the Sanctuary"
            content={
              this.state.stories.map((story, i) => {
                  return<>
                          <li key={story._id}> 
                          <p>{story.item} </p>
                            <div className="interaction">
                              <div className="icon">
                       
                                <img id={i} ref={this.editBtn} src={EditIcon} onClick={() => {this.toggleEditMenu(i)}} className={` ${editOn}`}/>

                              </div>
                              <div className="icon">
                                <img onClick={() => {this.deleteStory(story.item)}} src={DeletIcon}/> 
                              </div>
                            </div>
                          </li>
                          <div className="interaction">
                            <div className={`edit ${editOn}`}>
                              <textarea id={i} ref={this.editArea} type="text" name="edit" placeholder="I missunderstood you? What is it you want to update?" value={this.state.valueEditarea} onChange={this.handleEdit} />
                              <div className="icon-bgr">
                                <img className="icon" src={EditIcon} />
                              </div>
                            </div>
                          </div>
                        </>
              })
            }
            />
          </Leaf> 
        </Branch> 
        </BranchDirectRow>

        <BranchDirectRow>
          <Branch>  
            <Leaf>
            <form className="tgb-form" action="/api/story" method="POST" onSubmit={this.handleSubmit}>
              <h3>Tell me fellow Ironlight, what Story can you tell me today?</h3>
              <textarea type="text" name="item" placeholder="Tell me your Stroy" value={this.state.valueTextarea} onChange={this.handleChange} />
              <button className="tgb-btn authorize" type="submit" value="Submit" >Add Story</button>
            </form> 
            </Leaf> 
          </Branch> 
        </BranchDirectRow>
      </BranchDirectColumn>
      </>
    )  }
}