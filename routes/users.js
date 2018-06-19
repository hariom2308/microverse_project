const express = require('express');
const router = express.Router();
const server = require('../server');
let mongoose = require('mongoose');
const User = require('../models/user');

router.post('/signup', (req,res) => {
  const user = new User ({
    email: req.body.email,
    password:
  })
})
module.exports = router;
