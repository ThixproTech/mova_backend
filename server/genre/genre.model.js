const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    uniqueId: { type: String, default: "" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

genreSchema.index({ uniqueId: 1 });

module.exports = mongoose.model("Genre", genreSchema);
