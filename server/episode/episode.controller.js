const Episode = require("./episode.model");

//mongoose
const mongoose = require("mongoose");

//import model
const Movie = require("../movie/movie.model");
const Season = require("../season/season.model");

//deleteFromStorage
const { deleteFromStorage } = require("../../util/storageHelper");

//create episode
exports.store = async (req, res) => {
  try {
    if (!req.body.name || !req.body.episodeNumber || !req.body.season || !req.body.movieId || req.body.videoType === undefined || !req.body.videoUrl || !req.body.image) {
      return res.status(200).json({ status: false, message: "Oops ! Invalid details." });
    }
    if (!req.body.movieId || !req.body.season) {
      return res.status(200).json({ status: false, message: "movieId and seasonId must be requried." });
    }

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) {
      return res.status(200).json({ status: false, message: "Movie does not found." });
    }

    const season = await Season.findById(req.body.season);
    if (!season) {
      return res.status(200).json({ status: false, message: "Season does not found." });
    }

    const episode = new Episode();
    episode.image = req.body.image;
    episode.videoUrl = req.body.videoUrl;
    episode.name = req.body.name;
    episode.description = req.body.description ? req.body.description : episode.description;
    episode.episodeNumber = req.body.episodeNumber;
    episode.videoType = req.body.videoType;
    episode.movie = movie._id;
    episode.season = season._id;
    episode.seasonNumber = season.seasonNumber;

    episode.updateType = 1;
    episode.convertUpdateType.image = 1;
    episode.convertUpdateType.videoUrl = 1;

    season.episodeCount += 1;

    // if (!movie.season.includes(req.body.season)) {
    //   movie.season.push(req.body.season);
    //   await movie.save();
    // }

    await Promise.all([season.save(), episode.save()]);

    const data = await Episode.aggregate([
      {
        $match: { _id: episode._id },
      },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "movies",
          localField: "movie",
          foreignField: "_id",
          as: "movie",
        },
      },
      {
        $unwind: {
          path: "$movie",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: {
          name: 1,
          episodeNumber: 1,
          seasonNumber: 1,
          season: 1,
          runtime: 1,
          videoType: 1,
          videoUrl: 1,
          image: 1,
          TmdbMovieId: 1,
          description: 1,
          createdAt: 1,
          title: "$movie.title",
          movieId: "$movie._id",
        },
      },
    ]);

    return res.status(200).json({
      status: true,
      message: "Episode Added Successfully.",
      Episode: data[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: error.message || "Internal Server Error",
    });
  }
};

//update episode
exports.update = async (req, res) => {
  try {
    const episode = await Episode.findById(req.query.episodeId);
    if (!episode) {
      return res.status(200).json({ status: false, message: "episode does not found!!" });
    }

    episode.description = req.body.description ? req.body.description : episode.description;
    episode.name = req.body.name ? req.body.name : episode.name;
    episode.runtime = req.body.runtime ? req.body.runtime : episode.runtime;
    episode.videoType = req.body.videoType ? req.body.videoType : episode.videoType;
    episode.episodeNumber = req.body.episodeNumber ? req.body.episodeNumber : episode.episodeNumber;
    episode.movie = req.body.movie ? req.body.movie : episode.movie;
    episode.season = req.body.season ? req.body.season : episode.season;
    //episode.season = req.body.season ? req.body.season.split(",") : episode.season;

    if (req.body.image) {
      if (episode.image) {
        await deleteFromStorage(episode.image);
      }

      episode.updateType = 1; //always be 1
      episode.convertUpdateType.image = 1; //always be 1
      episode.image = req.body.image ? req.body.image : episode.image;
    }

    if (req.body.videoUrl) {
      if (req.body.videoType == 6 && (!req.body.convertUpdateType || !req.body.updateType)) {
        return res.status(200).json({ status: false, message: "convertUpdateType and updateType must be requried." });
      }

      if (episode.videoUrl) {
        await deleteFromStorage(episode.videoUrl);
      }

      episode.updateType = Number(req.body.updateType) || 1; //always be 1
      episode.convertUpdateType.videoUrl = Number(req.body.convertUpdateType.videoUrl) || 1; //always be 1
      episode.videoUrl = req.body.videoUrl ? req.body.videoUrl : episode.videoUrl;
    }

    //old seasonId
    const episodeData = await Episode.findOne({ _id: episode._id });
    const oldSeasonId = episodeData.season;
    const oldSeasonData = await Season.findById(oldSeasonId);

    //new seasonId
    const NewSeasonData = await Season.findById(req.body.season);

    oldSeasonData.episodeCount -= 1;
    NewSeasonData.episodeCount += 1;

    await Promise.all([oldSeasonData.save(), NewSeasonData.save(), episode.save()]);

    const data = await Episode.aggregate([
      {
        $match: { _id: episode._id },
      },
      {
        $lookup: {
          from: "movies",
          localField: "movie",
          foreignField: "_id",
          as: "movie",
        },
      },
      {
        $unwind: {
          path: "$movie",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: {
          name: 1,
          episodeNumber: 1,
          seasonNumber: 1,
          description: 1,
          season: 1,
          runtime: 1,
          videoType: 1,
          videoUrl: 1,
          image: 1,
          title: "$movie.title",
          movieId: "$movie._id",
        },
      },
    ]);

    return res.status(200).json({
      status: true,
      message: "Episode Updated Successfully.",
      episode: data[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: error.message || "Internal Server Error",
    });
  }
};

//get episode
exports.get = async (req, res) => {
  try {
    const episode = await Episode.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "movies",
          localField: "movie",
          foreignField: "_id",
          as: "movie",
        },
      },
      {
        $unwind: {
          path: "$movie",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: {
          name: 1,
          image: 1,
          videoType: 1,
          videoUrl: 1,
          seasonNumber: 1,
          season: 1,
          runtime: 1,
          episodeNumber: 1,
          TmdbMovieId: 1,
          updateType: 1,
          convertUpdateType: 1,
          createdAt: 1,
          description: 1,
          title: "$movie.title",
          movieId: "$movie._id",
        },
      },
    ]);

    return res.status(200).json({ status: true, message: "Retrive episodes by the admin.", episode });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message || "Internal Server Error",
    });
  }
};

//delete episode
exports.destroy = async (req, res) => {
  try {
    const episode = await Episode.findById(new mongoose.Types.ObjectId(req.query.episodeId));
    if (!episode) {
      return res.status(200).json({ status: false, message: "Episode does not found." });
    }

    if (episode?.image) {
      await deleteFromStorage(episode.image);
    }

    if (episode?.videoUrl) {
      await deleteFromStorage(episode.videoUrl);
    }

    res.status(200).json({ status: true, message: "Episode deleted by the admin." });

    const episodeData = await Episode.findOne({ _id: episode._id });
    const seasonId = episodeData.season;
    await Season.updateOne({ _id: seasonId }, { $inc: { episodeCount: -1 } });
    await episode.deleteOne();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error: error.message || "Internal Server Error" });
  }
};

//get season wise episode for admin
exports.seasonWiseEpisode = async (req, res) => {
  try {
    const movie = await Movie.findById(req.query.movieId);
    if (!movie) {
      return res.status(200).json({ status: false, message: "No Movie Was found." });
    }

    if (req.query.seasonId) {
      if (req.query.seasonId === "AllSeasonGet") {
        const episode = await Episode.aggregate([
          {
            $match: {
              movie: movie._id,
            },
          },
          { $sort: { seasonNumber: 1, episodeNumber: 1 } },
          {
            $lookup: {
              from: "movies",
              localField: "movie",
              foreignField: "_id",
              as: "movie",
            },
          },
          {
            $unwind: {
              path: "$movie",
              preserveNullAndEmptyArrays: false,
            },
          },
          {
            $project: {
              name: 1,
              image: 1,
              videoType: 1,
              videoUrl: 1,
              episodeNumber: 1,
              seasonNumber: 1,
              TmdbMovieId: 1, //show_id
              updateType: 1,
              convertUpdateType: 1,
              createdAt: 1,
              season: 1,
              description: 1,
              title: "$movie.title",
              movieId: "$movie._id",
            },
          },
        ]);

        return res.status(200).json({
          status: true,
          message: "Retrive season's episodes!",
          episode,
        });
      } else {
        const season = await Season.findOne({ _id: new mongoose.Types.ObjectId(req?.query?.seasonId?.trim()) });

        if (!season) {
          return res.status(200).json({ status: false, message: "No Season Was Found!!" });
        }

        const episode = await Episode.aggregate([
          {
            $match: {
              $and: [{ movie: movie._id }, { season: season._id }],
            },
          },
          {
            $sort: { episodeNumber: 1 },
          },
          {
            $lookup: {
              from: "movies",
              localField: "movie",
              foreignField: "_id",
              as: "movie",
            },
          },
          {
            $unwind: {
              path: "$movie",
              preserveNullAndEmptyArrays: false,
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              episodeNumber: 1,
              seasonNumber: 1,
              season: 1,
              runtime: 1,
              TmdbMovieId: 1, //show_id
              videoType: 1,
              videoUrl: 1,
              image: 1,
              updateType: 1,
              description: 1,
              convertUpdateType: 1,
              createdAt: 1,
              season: 1,
              movieId: "$movie._id",
              title: "$movie.title",
            },
          },
        ]);

        return res.status(200).json({
          status: true,
          message: "get Season Wise episodes!",
          episode,
        });
      }
    } else {
      return res.status(200).json({ status: true, message: "seasonId must be requried." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error: error.message || "Internal Server Error" });
  }
};

//get season wise episode for android
exports.seasonWiseEpisodeAndroid = async (req, res) => {
  try {
    const { movieId, seasonNumber } = req.query;

    if (!movieId || !mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(200).json({ status: false, message: "Invalid or missing movieId." });
    }

    const seasonNum = parseInt(seasonNumber);
    if (isNaN(seasonNum)) {
      return res.status(200).json({ status: false, message: "Invalid seasonNumber." });
    }

    const [movie, episodes] = await Promise.all([
      Movie.findById(movieId).select("_id").lean(),
      Episode.aggregate([
        {
          $match: {
            movie: new mongoose.Types.ObjectId(movieId),
            seasonNumber: seasonNum,
          },
        },
        { $sort: { episodeNumber: 1 } },
        {
          $lookup: {
            from: "movies",
            localField: "movie",
            foreignField: "_id",
            as: "movie",
          },
        },
        {
          $unwind: {
            path: "$movie",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            description: 1,
            episodeNumber: 1,
            seasonNumber: 1,
            season: 1,
            runtime: 1,
            TmdbMovieId: 1,
            videoType: 1,
            videoUrl: 1,
            image: 1,
            movieId: "$movie._id",
            title: "$movie.title",
            //description: "$movie.description",
            date: "$movie.date",
          },
        },
      ]),
    ]);

    if (!movie) {
      return res.status(200).json({ status: false, message: "No Movie Was Found." });
    }

    return res.status(200).json({
      status: true,
      message: "Retrieved season-wise episodes successfully.",
      episode: episodes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      error: error.message || "Internal Server Error",
    });
  }
};

//get movie only if type web series
exports.getSeries = async (req, res) => {
  try {
    var matchQuery;

    if (req.query.type === "SERIES") {
      matchQuery = { media_type: "tv" };
    }

    const movie = await Movie.find(matchQuery).sort({ createdAt: 1 });

    return res.status(200).json({ status: true, message: "Success", movie });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message || "Internal Server Error" });
  }
};
