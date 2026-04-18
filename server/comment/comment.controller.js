const Comment = require("./comment.model");

//dayjs
const dayjs = require("dayjs");

//mongoose
const mongoose = require("mongoose");

//import model
const Movie = require("../movie/movie.model");
const User = require("../user/user.model");

//create comment
exports.store = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.comment || !req.body.movieId) {
      return res.status(200).json({ status: false, message: "Oops ! Invalid details." });
    }

    const user = await User.findById(req.body.userId).select("_id fullName image");
    if (!user) {
      return res.status(200).json({ status: false, message: "User not found!" });
    }

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) {
      return res.status(200).json({ status: false, message: "No Movie found." });
    }

    const comment = new Comment();
    comment.userId = user._id;
    comment.movieId = movie._id;
    comment.comment = req.body.comment.trim();
    comment.date = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

    movie.comment += 1;

    await Promise.all([comment.save(), movie.save()]);

    return res.status(200).json({
      status: true,
      message: "Success",
      comment: {
        ...comment._doc,
        user: user._doc,
      },
    });
  } catch (error) {
    return res.status(200).json({
      status: false,
      error: error.message || "Internal Server Error",
    });
  }
};

//destroy comment
exports.destroy = async (req, res) => {
  try {
    const comment = await Comment.findById(req.query.commentId);
    if (!comment) {
      return res.status(200).json({ status: false, message: "Comment does not found." });
    }

    if (comment.movieId !== null) {
      await Movie.updateOne({ _id: comment.movieId }, { $inc: { comment: -1 } }).where({ comment: { $gt: 0 } });
    }

    await comment.deleteOne();

    return res.status(200).json({ status: true, message: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error: error.message || "Internal Server Error" });
  }
};

//get comment list of movie for android
exports.getComment = async (req, res) => {
  try {
    const { movieId, userId, start, limit } = req.query;

    if (!movieId || !mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(200).json({ status: false, message: "Invalid or missing movieId!" });
    }

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(200).json({ status: false, message: "Invalid or missing userId!" });
    }

    let now = dayjs();

    const [movie, user, comments] = await Promise.all([
      Movie.findById(movieId),
      User.findById(userId),
      Comment.aggregate([
        {
          $match: { movieId: new mongoose.Types.ObjectId(movieId) },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $lookup: {
            from: "likes",
            let: {
              commentId: "$_id",
              userId: new mongoose.Types.ObjectId(userId),
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ["$commentId", "$$commentId"] }, { $eq: ["$userId", "$$userId"] }],
                  },
                },
              },
            ],
            as: "isLike",
          },
        },
        {
          $project: {
            userId: "$user._id",
            fullName: "$user.fullName",
            userImage: "$user.image",
            comment: 1,
            like: 1,
            date: 1,
            isLike: 1,
            createdAt: 1,
            isLike: {
              $cond: [{ $eq: [{ $size: "$isLike" }, 0] }, false, true],
            },
          },
        },
        {
          $facet: {
            comment: [
              { $skip: start ? parseInt(start) : 0 }, // how many records you want to skip
              { $limit: limit ? parseInt(limit) : 20 },
            ],
          },
        },
      ]),
    ]);

    if (!movie) {
      return res.status(200).json({ status: false, message: "No Movie Was found!" });
    }

    if (!user) {
      return res.status(200).json({ status: false, message: "User not found!" });
    }

    const comment = comments[0].comment.map((data) => ({
      ...data,
      time:
        now.diff(data.createdAt, "minute") === 0
          ? "Just Now"
          : now.diff(data.createdAt, "minute") <= 60 && now.diff(data.createdAt, "minute") >= 0
            ? now.diff(data.createdAt, "minute") + " minutes ago"
            : now.diff(data.createdAt, "hour") >= 24
              ? dayjs(data.createdAt).format("DD MMM, YYYY")
              : now.diff(data.createdAt, "hour") + " hour ago",
    }));

    return res.status(200).json({
      status: comment.length > 0 ? true : false,
      message: comment.length > 0 ? "Success" : "No Data Found.",
      comment: comment.length > 0 ? comment : [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: true, error: error.message || "Internal Server Error" });
  }
};

//get comment list of movie for admin panel
exports.getComments = async (req, res) => {
  try {
    const { movieId } = req.query;

    if (!movieId || !mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(200).json({ status: false, message: "Invalid or missing movieId!" });
    }

    let now = dayjs();
    const movieObjectId = new mongoose.Types.ObjectId(movieId);

    const [movie, comments] = await Promise.all([
      Movie.findById(movieId),
      Comment.aggregate([
        {
          $match: { movieId: movieObjectId },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $project: {
            userId: "$user._id",
            fullName: "$user.fullName",
            userImage: "$user.image",
            comment: 1,
            date: 1,
            createdAt: 1,
          },
        },
      ]),
    ]);

    if (!movie) {
      return res.status(200).json({ status: false, message: "No Movie Was found!" });
    }

    const comment = await comments.map((data) => ({
      ...data,
      time:
        now.diff(data.createdAt, "minute") === 0
          ? "Just Now"
          : now.diff(data.createdAt, "minute") <= 60 && now.diff(data.createdAt, "minute") >= 0
            ? now.diff(data.createdAt, "minute") + " minutes ago"
            : now.diff(data.createdAt, "hour") >= 24
              ? dayjs(data.createdAt).format("DD MMM, YYYY")
              : now.diff(data.createdAt, "hour") + " hour ago",
    }));

    return res.status(200).json({
      status: comment.length > 0 ? true : false,
      message: comment.length > 0 ? "Success" : "No Data Found.",
      comment: comment.length > 0 ? comment : [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: true,
      error: error.message || "Internal Server Error",
    });
  }
};
