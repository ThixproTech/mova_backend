const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rating: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", default: null },
});

ratingSchema.index({ userId: 1 });
ratingSchema.index({ movieId: 1 });

module.exports = mongoose.model("Rating", ratingSchema);
