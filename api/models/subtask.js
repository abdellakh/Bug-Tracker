const mongoose = require("mongoose");
const Schema = mongoose.Schema

const SubTaskSchema = Schema({
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
  status: {
    type: Schema.Types.ObjectID,
    ref: "Status"
  },
  // period: {
  //   start: {
  //     type: Date
  //   },
  //   end: {
  //     type : Date
  //   }
  // },
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
  files: [
    {
      file: {
        type: Schema.Types.ObjectID,
      },
    },
  ]
});

module.exports = mongoose.module("Subtasks", SubTaskSchema);
