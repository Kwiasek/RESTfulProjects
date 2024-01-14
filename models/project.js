const mongoose = require("mongoose");
const { Schema } = mongoose;

const Project = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  liveUrl: { type: String, required: true },
  repoUrl: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  img: { data: Buffer, contentType: String },
});

Project.virtual("url").get(function () {
  return `/project/${this._id}`;
});

module.exports = mongoose.model("Project", Project);
