'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  name: String,
  status: {
    type: [{
      type: String,
      enum: ['pending', 'completed']
    }],
    default: ['pending']
  }
});

var UserSchema = new Schema({
  username: {
    type: String,
    Required: 'Kindly enter the uname'
  },
  password: {
    type: String,
    Required: 'Kindly enter the password'
  },
  task :[{
    type:Schema.ObjectId,
    ref:'Udata' 
  }]
})
module.exports = mongoose.model('Tasks', TaskSchema);
module.exports.uData = mongoose.model('UserData', UserSchema);
