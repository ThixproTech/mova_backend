const mongoose = require("mongoose");

const shortVideoSchema = new mongoose.Schema(
  {
    movieSeries: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", default: null },
    videoImage: { type: String, trim: true },
    videoUrlType: { type: Number, default: 0 }, //1.link 2.file
    videoUrl: { type: String, trim: true },
    duration: { type: Number, default: 0 }, //in seconds
    shareCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("ShortVideo", shortVideoSchema);
