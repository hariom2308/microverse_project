const express = require('express');
const router = express.Router();
const server = require('../server');
let mongoose = require('mongoose');
const Event = require('../models/event');


router.post('/', function(req, res) {
  const event = new Event({
    _id: new mongoose.Types.ObjectId,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date
  });
  event
    .save()
    .then(result => {
      // console.log(result);
      res.send(result);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
}); //end of post

router.get('/', function(req, res) {
  Event.find()
  .exec()
  .then(docs => {
    if(docs.length >= 0){
      res.status(200).json(docs);
    } else {
      res.json({
        message: 'No events found'
      });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});  //end of get

router.get('/search', function(req, res) {
  let title=req.query.title;
  Event.findOne({title: title})
    .exec()
    .then(doc => {
    //  console.log(doc);
      if(doc) {
        res.status(200).json(doc);
      }else {
         res.status(404).json({
           message: "Event with given title does not exist"
         });
       }
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
}); //end of get:id

router.get('/:id', function(req, res) {
  let id =req.params.id;
  Event.findById(id)
    .exec()
    .then(doc => {
    //  console.log(doc);
      if(doc) {
        res.status(200).json(doc);
      }else {
         res.status(404).json({
           message: "Event with given ID does not exist"
         });
       }
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
}); //end of get:id

router.patch('/:id', function(req, res) {
  Event.updateOne({_id: req.params.id}, {$set: req.body})
    .exec()
    .then(result => {
    //  console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}); //end of patch:id

router.delete('/:id', function(req, res) {
  Event.remove({_id: req.params.id})
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  }); //end of delete

module.exports = router;
