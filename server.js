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

let event1 = {
  id: "1" ,
  title: "Homie" ,
  description: "Its happening on Saturday",
  date: "23.06.2018"
};

let event2 = {
  id: "2" ,
  title: "Baba" ,
  description: "Black sheep",
  date: "24.06.2018"
};

let event3 = {
  id: "3" ,
  title: "Ewaa" ,
  description: "Trip to Poland on Friday",
  date: "02.06.2018"
};

let events = {
  1: event1,
  2: event2,
  3: event3
};

// app.get('/events/:id', function(req, res) {
//   if (!events.hasOwnProperty(req.params.id)) {
//     res.status(404).send('error 404');
//     } else {
//       res.send(events[req.params.id]);
//     }
//   }
// );

// app.patch('/events/:id', function(req, res) {
// if (!events.hasOwnProperty(req.params.id)) {
//   res.status(404).send('Not a valid event id');
//   } else {
//     let id;
//     if (req.body.id){
//       id = req.body.id;
//     } else {
//       id = events[req.params.id]["id"] ;
//     }
//
//     let title = req.body.title;
//     let description = req.body.description;
//     let date = req.body.date;
//     let updatedEvent = {"id": id, "title": title, "description": description, "date": date};
//     events[id] = updatedEvent;
//     res.send(updatedEvent);
//   }
// }
// );

// app.delete('/events/:id', function(req, res) {
//   delete events[req.params.id];
//   res.send('');
// });

module.exports = app;
