const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const eris = require('eris');


const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://testuser:user@cluster0-uq1kn.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true , useNewUrlParser: true });
var storySchema = new mongoose.Schema({
  item: String
});
//mongoose.set('useFindAndModify', false);
var Story = mongoose.model('Story', storySchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Discord BOT
const bot = new eris.Client('NjQ3MTgyNTA4MDYwMDQ5NDEw.XhDoWA.G5HaPzWvbirume8qSe45phYlNRY');
var guildID = "637354682716782602"
var channelID ="647159337709469726"
// When the bot is connected and ready, log to console.
bot.on('ready', () => {
   console.log('Connected and ready.');
   //bot.createMessage(channelID, "And the story goes on...!");
});
// Every time a message is sent anywhere the bot is present,
// this event will fire and we will check if the bot was mentioned.
// If it was, the bot will attempt to respond with "Present".
bot.on('messageCreate', async (msg) => {
   const botWasMentioned = msg.mentions.find(
       mentionedUser => mentionedUser.id === bot.user.id,
   );

    if (msg.channel.type === 1)
    {
        try {
            bot.createMessage(channelID, msg.content);
        } catch (err) {
            // There are various reasons why sending a message may fail.
            // The API might time out or choke and return a 5xx status,
            // or the bot may not have permission to send the
            // message (403 status).
            console.warn('Failed to respond to mention.');
            console.warn(err);
        }
    }

   if (botWasMentioned) {
       try {
           await msg.channel.createMessage('Present');
       } catch (err) {
           // There are various reasons why sending a message may fail.
           // The API might time out or choke and return a 5xx status,
           // or the bot may not have permission to send the
           // message (403 status).
           console.warn('Failed to respond to mention.');
           console.warn(err);
       }
   }
});
bot.on('error', err => {
   console.warn(err);
});
bot.connect();


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
        console.log(data)
        
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
/*
  app.put('/api/story/:item', urlencodedParser, function(req, res){
    // Update the requested item from mongodb
    
    Story.find({item: req.params.item}).updateOne(function(err, data){
        if (err) throw err;
        res.json(data);
        console.log("Edit")
    });
    
  });

*/

/*
  app.put('/api/story/:item', urlencodedParser, function(req, res){
    const itemId = req.params.item;
    const item = req.body;
  console.log("Editing item: ", itemId, " to be ", item);
    // Update the requested item from mongodb
    
    Story.updateOne({ id: itemId }, { $set: item }, (err, data) => {
      if (err) throw err;
      // send back entire updated list, to make sure frontend data is up-to-date
      console.log("working");
  });
});
*/



/*
app.put("/api/story/:item", (request, response) => {
  const itemId = request.params.item;
  const item = request.body;
  console.log("Editing item: ", itemId, " to be ", item);

  Story.updateOne({ id: itemId }, { $set: item }, (error, result) => {
      if (error) throw error;
      // send back entire updated list, to make sure frontend data is up-to-date
      Story.find().toArray(function(_error, _result) {
        if (_error) throw _error;
        response.json(_result);
    });
  });
});
*/
/*

app.put("/api/story/:item", (request, response) => {
  const itemId = request.params.id;
  const item = request.body;
  console.log("Editing item: ", itemId, " to be ", item);

  Story.updateOne({ id: itemId }, { $set: item }, (error, result) => {
      if (error) throw error;
      // send back entire updated list, to make sure frontend data is up-to-date

  });
});
*/


app.put('/api/story/', urlencodedParser, async function(req, res){
  const filter = {_id:req.body._id}
  const updatedItem ={item:req.body.item}
  console.log("Editing item: ", filter, " to be ", updatedItem);
  // Update the requested item from mongodb
  
  let doc = await Story.findOneAndUpdate(filter , updatedItem, {
    new: true
  });
  console.log(doc.item)
  console.log(doc._id)
});





  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });



  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}
