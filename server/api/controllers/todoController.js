'use strict';


var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks'),
  User = mongoose.model('UserData');

exports.list_all_tasks = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    //console.log(user.task.length);
    for(var i=0;i<user.task.length;i++){
      Task.findById(user.task[i], function(err, task) {
        res.json(task);  
      });
    }
  });
};

exports.create_user = function(req, res) {
  var new_user = new User(req.body);
  new_user.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    Task.findById(req.params.userId, function(err, user) {
      if (err)
        res.send(err);
      user.task.push(task._id);
      res.json(task);
    });
  });
};


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    Task.findById(req.params.userId, function(err, user) {
      if (err)
        res.send(err);
      var index = user.task.indexOf(req.params.taskId);
      if (index > -1) {
        user.task.splice(index, 1);
      }
      res.json({ message: 'Task successfully deleted' });
    });
  });
};