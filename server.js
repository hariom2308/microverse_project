const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

//mongoose
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/microverseproject');
let db = mongoose.connection;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

if(!module.parent) {
   app.listen(3002, () => console.log('Example app listening on port 3002!'));
}

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({ userName: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      bcrypt.compare(password, user.password, (err, result) => {
        if (result){
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  }
));

//-----------------------------monogdb----
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(err, client) {
  app.use('/events', passport.authenticate('basic', { session: false }),
 eventRoutes);
  app.use('/users', userRoutes);
  console.log("Connected successfully to server");
});

module.exports = {app, db};
