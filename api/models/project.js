const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
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
    ref: "Users",
  }
});

module.exports = mongoose.model("Projects", ProjectSchema);
