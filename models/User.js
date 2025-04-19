const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  name:String,
  phone:String,
  profileImage:String
});

module.exports = mongoose.model('User', userSchema);
