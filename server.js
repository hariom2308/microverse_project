const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');
//mongoose
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/microverseproject');
let db = mongoose.connection;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
if(!module.parent) {
   app.listen(3002, () => console.log('Example app listening on port 3002!'));
}

//-----------------------------monogdb
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(err, client) {
  app.use('/events', eventRoutes);
  app.use('/users', userRoutes);
  console.log("Connected successfully to server");
});

module.exports = app;
