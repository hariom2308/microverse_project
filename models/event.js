const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  date: Date,
  user: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  //TO DO: date is saved in different timezone
  //TO DO: add indexes
});

module.exports = mongoose.model('Event', eventSchema);
