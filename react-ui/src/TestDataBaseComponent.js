import React, {Component} from 'react';
import Branch from './components/Branch';
import BranchDirectRow from './components/BranchDirectRow';
import BranchDirectColumn from './components/BranchDirectColumn';
import Leaf from './components/Leaf';
import CardStoryteller from './components/CardStoryteller';


export default class TestDataBaseComponent extends Component {
  constructor(props) {    
    super(props)
    this.state = {
        error: null,
        isLoaded: false,
        stories: [],
        valueTextarea:[]
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
      
      console.log("hello" + json)
     
      

    }).catch(e => {

    })
}

componentDidMount() {
  this.getStory()
  this.interval = setInterval(() => this.getStory(), 10000);
}
//Handler
handleChange(event) {
  this.setState({valueTextarea: event.target.value});
}

handleSubmit(event) {
  this.postStory();
  event.preventDefault();
}

//Render FrontEnd with Data
render() {    
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
              this.state.stories.map(story => {
                  return <li key={story._id}> {story.item} </li>;
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