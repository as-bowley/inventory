const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: { type: String },
  sport: { type: String },
  nationality: { type: String },
  league: { type: String },
});

TeamSchema.virtual("url").get(function () {
  return `/catalog/team/${this._id}`;
});

// Export model
module.exports = mongoose.model("Team", TeamSchema);
