const express = require('express');
const router = express.Router();
const server = require('../server');
let mongoose = require('mongoose');
const User = require('../models/user');
let bcrypt = require('bcrypt');

router.post('/', (req,res) => {
    bcrypt.hash(req.body.email, 10, (err,hash) => {
      if(err) {
        return res.status(500).json({
          error: err
        });
      } else {
        const user = new User ({
          userName: req.body.userName,
          email: req.body.email,
          password: hash,
          fullName: req.body.fullName
        });
        user
        .save()
        .then(result => {
          res.status(201).json({
            message: 'user created',
          });
          console.log(result);
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
      }
    })
});
module.exports = router;
