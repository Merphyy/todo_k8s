const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

module.exports = Task = mongoose.model('task', TaskSchema);
