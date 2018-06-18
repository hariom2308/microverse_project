const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const eventRoutes = require('./routes/events');
//mongoose
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/microverseproject');
let db = mongoose.connection;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.listen(3002, () => console.log('Example app listening on port 3000!'));


//-----------------------------monogdb
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(err, client) {
  app.use('/events', eventRoutes);
  console.log("Connected successfully to server");
});


module.exports = app;
