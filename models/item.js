const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  stock: { type: Number },
  size: { type: Schema.Types.ObjectId, ref: "Size", required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
});

ItemSchema.virtual("formattedPrice").get(function () {
  return `€${this.price}`;
});

ItemSchema.virtual("url").get(function () {
  return `/catalog/item/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);
