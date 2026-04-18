const ShortVideo = require("./shortVideo.model");

//import model
const MovieSeries = require("../movie/movie.model");
const User = require("../user/user.model");

//mongoose
const mongoose = require("mongoose");

//deleteFromStorage
const { deleteFromStorage } = require("../../util/storageHelper");

//create shortVideo (movie or webseries wise)
exports.addShortVideo = async (req, res) => {
  try {
    if (!settingJSON) {
      await deleteUploadedFiles(req.body);
      return res.status(200).json({ status: false, message: "Setting does not found!" });
    }

    const { movieSeriesId, videoImage, videoUrlType, videoUrl, duration } = req.body;
    const durationOfShorts = settingJSON.durationOfShorts || 30;

    if (!movieSeriesId || !videoImage?.trim() || !videoUrl?.trim() || duration === undefined) {
      await deleteUploadedFiles(req.body);
      return res.status(200).json({ status: false, message: "Missing required fields." });
    }

    if (durationOfShorts < parseInt(duration)) {
      await deleteUploadedFiles(req.body);
      return res.status(200).json({
        status: false,
        message: "⚠️ Your video duration exceeds the limit set by the admin.",
      });
    }

    const movieSeriesObjId = new mongoose.Types.ObjectId(movieSeriesId);

    const [movieSeries] = await Promise.all([MovieSeries.findById(movieSeriesObjId).select("_id").lean()]);

    if (!movieSeries) {
      await deleteUploadedFiles(req.body);
      return res.status(200).json({ status: false, message: "MovieSeries does not found." });
    }

    const shortVideo = new ShortVideo({
      movieSeries: movieSeries._id,
      videoImage,
      videoUrl,
      videoUrlType: parseInt(videoUrlType),
      duration: parseInt(duration),
    });

    await shortVideo.save();

    res.status(200).json({
      status: true,
      message: "Content created successfully",
      data: shortVideo,
    });
  } catch (error) {
    await deleteUploadedFiles(req.body);
    console.error(error);
    return res.status(500).json({ status: false, error: error.message || "Internal Server error" });
  }
};

//update shortVideo (movie or webseries wise)
exports.modifyShortVideo = async (req, res) => {
  try {
    if (!req.body.shortVideoId) {
      await deleteUploadedFiles(req.body);
      return res.status(200).json({ status: false, message: "The 'shortVideoId' field is required." });
    }

    const shortVideoId = new mongoose.Types.ObjectId(req.body.shortVideoId);
    const durationOfShorts = settingJSON.durationOfShorts || 30;

    const shortVideo = await ShortVideo.findById(shortVideoId);
    if (!shortVideo) {
      await deleteUploadedFiles(req.body);
      return res.status(200).json({ status: false, message: "ShortVideo does not found." });
    }

    if (req?.body?.videoUrl && durationOfShorts < parseInt(req.body.duration)) {
      await deleteUploadedFiles(req.body);
      return res.status(200).json({
        status: false,
        message: "⏳ Your video duration exceeds the limit set by the admin.",
      });
    }

    if (req?.body?.videoImage) {
      if (shortVideo.videoImage) {
        await deleteFromStorage(shortVideo.videoImage);
      }

      shortVideo.videoImage = req.body.videoImage ? req.body.videoImage : shortVideo.videoImage;
    }

    if (req?.body?.videoUrl) {
      if (shortVideo.videoUrl) {
        await deleteFromStorage(shortVideo.videoUrl);
      }

      shortVideo.videoUrl = req.body.videoUrl ? req.body.videoUrl : shortVideo.videoUrl;
    }

    shortVideo.duration = parseInt(req.body.duration) || shortVideo.duration;
    await shortVideo.save();

    return res.status(200).json({
      status: true,
      message: "ShortVideo updated successfully",
      data: shortVideo,
    });
  } catch (error) {
    await deleteUploadedFiles(req.body);
    console.error(error);
    return res.status(500).json({ status: false, error: error.message || "Internal Server error" });
  }
};

//fetch shortVideos
exports.listShortVideos = async (req, res) => {
  try {
    const start = req.query.start ? parseInt(req.query.start) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;

    const [totalShortVideos, shortVideo] = await Promise.all([
      ShortVideo.countDocuments(),
      ShortVideo.aggregate([
        {
          $lookup: {
            from: "movies",
            localField: "movieSeries",
            foreignField: "_id",
            as: "movieSeries",
          },
        },
        { $unwind: { path: "$movieSeries", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "likes",
            localField: "_id",
            foreignField: "videoId",
            as: "totalLikes",
          },
        },
        {
          $project: {
            _id: 1,
            videoImage: 1,
            videoUrl: 1,
            shareCount: 1,
            videoUrlType: 1,
            duration: 1,
            createdAt: 1,
            movieSeriesTitle: "$movieSeries.title",
            movieSeriesDes: "$movieSeries.description",
            totalLikes: { $size: "$totalLikes" },
          },
        },
        { $sort: { createdAt: 1 } },
        { $skip: (start - 1) * limit },
        { $limit: limit },
      ]),
    ]);

    return res.status(200).json({ status: true, message: "Success", total: totalShortVideos, data: shortVideo });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message || "Internal Server error" });
  }
};

//fetch particular movie or webseries wise shortVideos
exports.fetchMediaContent = async (req, res) => {
  try {
    const start = req.query.start ? parseInt(req.query.start) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 50;

    if (!req.query.movieSeriesId) {
      return res.status(200).json({ status: false, message: "Oops! Invalid details." });
    }

    const movieSeriesId = new mongoose.Types.ObjectId(req.query.movieSeriesId);

    const [total, videos] = await Promise.all([
      ShortVideo.countDocuments({ movieSeries: new mongoose.Types.ObjectId(movieSeriesId) }),
      ShortVideo.aggregate([
        {
          $match: {
            movieSeries: new mongoose.Types.ObjectId(movieSeriesId),
          },
        },
        {
          $lookup: {
            from: "likes",
            localField: "_id",
            foreignField: "videoId",
            as: "totalLikes",
          },
        },
        {
          $project: {
            _id: 1,
            videoImage: 1,
            videoUrl: 1,
            shareCount: 1,
            videoUrlType: 1,
            duration: 1,
            createdAt: 1,
            totalLikes: { $size: "$totalLikes" },
          },
        },
        { $sort: { createdAt: 1 } },
        { $skip: (start - 1) * limit },
        { $limit: limit },
      ]),
    ]);

    return res.status(200).json({ status: true, message: "Retrieved videos from a specific movie series.", total: total, data: videos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message || "Internal Server Error" });
  }
};

//delete a short video
exports.destroyShortMedia = async (req, res) => {
  try {
    if (!req.query.shortVideoId) {
      return res.status(200).json({ status: false, message: "The 'shortVideoId' field is required." });
    }

    const shortVideoId = new mongoose.Types.ObjectId(req.query.shortVideoId);

    const shortVideo = await ShortVideo.findById(shortVideoId).select("videoImage videoUrl").lean();
    if (!shortVideo) {
      return res.status(200).json({ status: false, message: "ShortVideo not found." });
    }

    res.status(200).json({
      status: true,
      message: "ShortVideo deleted successfully.",
    });

    await Promise.all([
      shortVideo.videoImage ? deleteFromStorage(shortVideo.videoImage) : null,
      shortVideo.videoUrl ? deleteFromStorage(shortVideo.videoUrl) : null,
      ShortVideo.deleteOne({ _id: shortVideoId }),
    ]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, error: error.message || "Internal Server Error" });
  }
};

//update share count ( client )
exports.incrementShortVideoShareCount = async (req, res) => {
  try {
    if (!req.query.shortVideoId) {
      return res.status(200).json({ status: false, message: "Invalid request parameters." });
    }

    const shortVideoId = new mongoose.Types.ObjectId(req.query.shortVideoId);

    const shortVideo = await ShortVideo.findById(shortVideoId).select("_id").lean();

    if (!shortVideo) {
      return res.status(200).json({ status: false, message: "Short video not found." });
    }

    res.status(200).json({
      status: true,
      message: "Share count successfully updated for the short video.",
    });

    await ShortVideo.updateOne({ _id: shortVideoId }, { $inc: { shareCount: 1 } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: error.message || "Something went wrong on the server." });
  }
};

//get shortVideos ( client )
exports.fetchShortVideos = async (req, res, next) => {
  try {
    if (!req.query.userId) {
      return res.status(200).json({ status: false, message: "Missing required parameters: userId." });
    }

    const userId = new mongoose.Types.ObjectId(req.query.userId);
    const start = req.query.start ? parseInt(req.query.start) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;

    const [user, videos] = await Promise.all([
      User.findOne({ _id: userId }).select("_id").lean(),
      ShortVideo.aggregate([
        {
          $lookup: {
            from: "movies",
            localField: "movieSeries",
            foreignField: "_id",
            as: "movieSeries",
          },
        },
        { $unwind: { path: "$movieSeries", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "genres",
            localField: "movieSeries.genre",
            foreignField: "_id",
            as: "genres",
          },
        },
        {
          $lookup: {
            from: "likes",
            localField: "_id",
            foreignField: "videoId",
            as: "totalLikes",
          },
        },
        {
          $lookup: {
            from: "likes",
            let: { videoId: "$_id", userId: userId },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ["$videoId", "$$videoId"] }, { $eq: ["$userId", "$$userId"] }],
                  },
                },
              },
            ],
            as: "likeHistory",
          },
        },
        {
          $project: {
            _id: 1,
            videoImage: 1,
            videoUrl: 1,
            shareCount: 1,
            createdAt: 1,
            movieSeriesId: "$movieSeries._id",
            movieSeriesTitle: "$movieSeries.title",
            movieSeriesDes: "$movieSeries.description",
            genre: "$genres.name",
            isLike: { $cond: [{ $gt: [{ $size: "$likeHistory" }, 0] }, true, false] },
            totalLikes: { $size: "$totalLikes" },
          },
        },
        { $skip: (start - 1) * limit },
        { $limit: limit },
      ]),
    ]);

    if (!user) {
      return res.status(200).json({ status: false, message: "User not found." });
    }

    return res.status(200).json({
      status: true,
      message: "ShortVideos retrieved successfully.",
      data: videos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: error.message || "Internal Server Error" });
  }
};
