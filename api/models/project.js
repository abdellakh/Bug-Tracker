const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ProjectSchema = Schema({
  created_at: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  categories: [
    {
      categorie: {
        type: Schema.Types.ObjectID,
      },
    },
  ],
  members: [
    {
      user: {
        type: Schema.types.ObjectID,
      },
    },
  ],
  author: {
    type: Schema.types.ObjectID,
    ref: "User",
  }
});

module.exports = mongoose.model("Projects", ProjectSchema);
