const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
let fileSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user: {
      type: String,
      default: "Undefined",
    },
    img: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    format: {
      type: String,
      default: "other",
    },
    createdAt: {
      type: String,
      default: "undefined",
    },
    userID: {
      type: String,
      default: "undefined",
    },
    originalName: {
      type: String,
      default: "undefined",
    },
  },
  {
    collection: "files",
  }
);

module.exports = mongoose.model("File", fileSchema);
