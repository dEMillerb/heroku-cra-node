import React, {Component} from 'react';

export default class TestDataBaseComponent extends Component {
  constructor(props) {    
    super(props)
    this.state = {
        error: null,
        isLoaded: false,
        stories: []
      };

}
componentDidMount() {
    console.log("Use Test service")
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

render() {    
    return (
    <div class="content">    
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