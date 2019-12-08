import React, {Component} from 'react';

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
    <div class="content">    
        <form action="/api/story" method="POST" onSubmit={this.handleSubmit}>
        <label>
          <textarea type="text" name="item" placeholder="Tell me your Stroy" value={this.state.valueTextarea} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        <h3>Test Component with Database</h3> 
        <ul>
            {
              this.state.stories.map(story => {
                  return <li key={story._id}> message={story.item} </li>;
              })
            }
        </ul>
    </div>
    )  }
}