const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: "ShortVideo", default: null },
  },
  {
    timestamps: true,
  }
);

likeSchema.index({ userId: 1 });
likeSchema.index({ commentId: 1 });
likeSchema.index({ videoId: 1 });

module.exports = mongoose.model("Like", likeSchema);
