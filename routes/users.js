const express = require('express');
const router = express.Router();
const server = require('../server');
let mongoose = require('mongoose');
const User = require('../models/user');

router.post('/', (req,res) => {
  const user = new User ({
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
    fullName: req.body.fullName
  })
  user
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
  User.find()
  .exec()
  .then(docs => {
    //console.log(docs);
    if(docs.length >= 0){
      res.status(200).json(docs);
    } else {
      res.json({
        message: 'No users found'
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
module.exports = router;
