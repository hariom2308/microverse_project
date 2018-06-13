const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/microverseproject';
let ObjectId = require('mongodb').ObjectID;



app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.listen(3000, () => console.log('Example app listening on port 3000!'))


//-----------------------------monogdb

MongoClient.connect(url, function(err, client) {
  let db = client.db('microverseproject');

  console.log("Connected successfully to server");

  app.post('/events', function(req, res) {

    let collection = db.collection('microverseproject');
    db.collection('events', function(err, collection){

      let title = req.body.title;
      let description = req.body.description;
      let date = req.body.date;
      let newEvent = {"title": title, "description": description, "date": date};

      collection.insert(newEvent);
      res.send(newEvent);


      db.collection('events').count(function(err, count){
        if(err) throw err;

        console.log('total events: ' + count);
        //client.close()
      })
    });
  }); //end of post

  app.get('/events', function(req, res) {
    db.collection("events").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });  //end of get

  app.get('/events/:id', function(req, res) {
    let id =req.params.id;
    db.collection("events").find({_id : ObjectId(id)}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  }); //end of get:id

  app.patch('/events/:id', function(req, res) {

    db.collection("events").updateOne({_id: ObjectId(req.params.id)}, {$set: req.body}, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  }); //end of patch:id
  app.delete('/events/:id', function(req, res) {
    db.collection('events').deleteOne({_id: ObjectId(req.params.id)}, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  }); //end of delete

});


module.exports = app;
