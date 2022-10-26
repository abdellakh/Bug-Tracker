const mongoose = require("mongoose");

const SubTaskSchema = mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  comments: [
    {
      content: {
        type: String,
        required: true,
      },
      author: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      created_at: {
        type: Date,
        default: () => new Date(), // ? Set function as default value, and not just new Date(), or it will set the new Date() at the moment of required by the route !
      },
    },
  ],
});

module.exports = mongoose.module("Subtasks", SubTaskSchema);
