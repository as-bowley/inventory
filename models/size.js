const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SizeSchema = new Schema({
  size: { type: String },
});

SizeSchema.virtual("url").get(function () {
  return `/catalog/size/${this._id}`;
});

// Export model
module.exports = mongoose.model("Size", SizeSchema);
