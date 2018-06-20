const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  fullName: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);
