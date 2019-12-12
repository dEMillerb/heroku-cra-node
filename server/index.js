const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://testuser:user@cluster0-uq1kn.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true , useNewUrlParser: true });
var storySchema = new mongoose.Schema({
  item: String
});

var Story = mongoose.model('Story', storySchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();
  app.use(bodyParser.json())
  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));


  // Answer API requests.
  /*app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });*/
  
  app.get('/api/story', function(req, res) {
    Story.find({}, function(err, data){
      if (err) throw err;

      var jsonToReturnToUi={
        storys: data
      }
      res.send(
        jsonToReturnToUi
        );
    });
  })

  app.post('/api/story', urlencodedParser, function(req, res){
    //get data from the view and add it to mongodb
    var newStory = Story(req.body).save(function(err, data){
        if (err) throw err;
        res.status(201).send()
        console.log("hallo")
    })
  });

  app.delete('/api/story/:item', urlencodedParser, function(req, res){
    // delete the requested item from mongodb
    
    Story.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data){
        if (err) throw err;
        res.json(data);
        console.log("bye")
    });
    
  });

  app.put('/api/story/:item', urlencodedParser, function(req, res){
    // Update the requested item from mongodb
    
    Story.find({item: req.params.item}).updateOne(function(err, data){
        if (err) throw err;
        res.json(data);
        console.log("bye")
    });
    
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });



  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}
