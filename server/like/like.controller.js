const Like = require("./like.model");

//dayjs
const dayjs = require("dayjs");

//mongoose
const mongoose = require("mongoose");

//import model
const User = require("../user/user.model");
const Comment = require("../comment/comment.model");
const ShortVideo = require("../shortVideo/shortVideo.model");

//create Like or Dislike for comment
exports.likeAndDislike = async (req, res) => {
  try {
    if (req.body.userId && req.body.commentId) {
      const user = await User.findById(req.body.userId);
      if (!user) {
        return res.status(200).json({ status: false, message: "User Does Not found." });
      }

      const comment = await Comment.findById(req.body.commentId);
      if (!comment) {
        return res.status(200).json({ status: false, message: "Comment Does Not found." });
      }

      const [likeComment, comment_] = await Promise.all([Like.findOne({ userId: user._id, commentId: comment._id }), User.findOne({ _id: comment.userId })]);

      //dislike
      if (likeComment) {
        res.status(200).send({
          status: true,
          message: "Comment dislike successfully.",
          isLike: false,
        });

        await Like.deleteOne({
          userId: user._id,
          commentId: comment._id,
        });

        if (comment_.like > 0) {
          comment_.like -= 1;
          await comment_.save();
        }

        if (comment.like > 0) {
          comment.like -= 1;
          await comment.save();
        }
      } else {
        //like
        const like = new Like({
          userId: user._id,
          commentId: comment._id,
        });
        await like.save();

        res.status(200).send({
          status: true,
          message: "Comment Like successfully.",
          isLike: true,
        });

        if (req.body.userId.toString() == req.body.commentId.toString()) comment_.like += 1;
        await comment_.save();

        comment.like += 1;
        await comment.save();
      }
    } else {
      return res.status(200).json({
        status: false,
        message: "Oops ! Invalid details.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message || "Internal Server Error" });
  }
};

//get comment likes
exports.index = async (req, res) => {
  try {
    if (!req.query.commentId) {
      return res.status(200).json({ status: false, message: "Oops ! Invalid details." });
    }

    const commentId = new mongoose.Types.ObjectId(req.query.commentId);

    const [commentExist, like] = await Promise.all([Comment.findById(commentId), Like.find({ commentId: commentId }).populate("userId commentId").sort({ createdAt: -1 })]);

    if (!commentExist) {
      return res.status(200).json({ status: false, message: "Comment Does not found." });
    }

    const likes = await like.map((data) => ({
      _id: data._id,
      userId: data.userId ? data.userId._id : "",
      commentId: data.commentId ? data.commentId._id : "",
      like: data.commentId ? data.commentId.like : "",
    }));

    return res.status(200).json({ status: true, message: "Success", like: likes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, error: error.message || "Internal Server Error" });
  }
};

//create Like or Dislike for shortVideo
exports.likeOrDislikeOfShortVideo = async (req, res) => {
  try {
    if (!req.query.userId || !req.query.videoId) {
      return res.status(200).json({ status: false, message: "Invalid user or video ID." });
    }

    const userId = new mongoose.Types.ObjectId(req.query.userId);
    const videoId = new mongoose.Types.ObjectId(req.query.videoId);

    const [user, video, alreadyLikedVideo] = await Promise.all([
      User.findOne({ _id: userId }).select("_id isBlock name"),
      ShortVideo.findById(videoId),
      Like.findOne({ userId: userId, videoId: videoId }),
    ]);

    if (!user) {
      return res.status(200).json({ status: false, message: "User not found." });
    }

    if (user.isBlock) {
      return res.status(200).json({ status: false, message: "Your account is blocked." });
    }

    if (!video) {
      return res.status(200).json({ status: false, message: "Short video not found." });
    }

    if (alreadyLikedVideo) {
      await Like.deleteOne({ userId: user._id, videoId: video._id });

      return res.status(200).json({
        status: true,
        message: "You have removed your like from the short video.",
        isLike: false,
      });
    } else {
      const like = new Like({
        userId: user._id,
        videoId: video._id,
      });
      await like.save();

      return res.status(200).json({
        status: true,
        message: "You have liked the short video.",
        isLike: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: error.message || "Internal Server Error",
    });
  }
};
