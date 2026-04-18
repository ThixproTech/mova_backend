const Favorite = require("./favorite.model");

//import model
const User = require("../user/user.model");
const Movie = require("../movie/movie.model");

//create Favorite [Only User can do favorite]
exports.store = async (req, res) => {
  try {
    if (!req.body || !req.body.userId || !req.body.movieId) {
      return res.status(200).json({ status: false, message: "Oops ! Invalid details." });
    }

    const [user, movie] = await Promise.all([User.findById(req.body.userId), Movie.findById(req.body.movieId)]);

    if (!user) {
      return res.status(200).json({ status: false, message: "User does not found." });
    }

    if (!movie) {
      return res.status(200).json({ status: false, message: "No Movie Was found." });
    }

    const favorite = await Favorite.findOne({ userId: user._id, movieId: movie._id });

    if (favorite) {
      res.status(200).json({
        status: true,
        message: "Unfavorite done",
        isFavorite: false,
        movieId: movie._id,
      });

      await Favorite.deleteOne({
        userId: user._id,
        movieId: movie._id,
      });
    } else {
      res.status(200).json({
        status: true,
        message: "Favorite done",
        isFavorite: true,
        movieId: movie._id,
      });

      const favorite_ = new Favorite();
      favorite_.userId = user._id;
      favorite_.movieId = movie._id;
      await Promise.all([favorite_.save()]);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: error.message || "Internal Server Error",
    });
  }
};

//get Favorite List of Movie For Android
exports.getFavoriteList = async (req, res) => {
  try {
    if (!req.query.userId) {
      return res.status(200).json({ status: false, message: "User Id is required." });
    }

    const [user, planExist] = await Promise.all([User.findById(req.query.userId), User.findOne({ _id: req.query.userId }, { isPremiumPlan: true })]);

    if (!user) {
      return res.status(200).json({ status: false, message: "User does not found." });
    }

    const favorite = await Favorite.aggregate([
      {
        $match: {
          userId: user._id,
        },
      },
      { $sort: { createdAt: -1 } },
      { $addFields: { isPlan: planExist.isPremiumPlan ? true : false } },
      {
        $lookup: {
          from: "ratings",
          let: {
            movie: "$movieId",
          },

          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$$movie", "$movieId"] },
              },
            },
            {
              $group: {
                _id: "$movieId",
                totalUser: { $sum: 1 }, //totalRating by user
                avgRating: { $avg: "$rating" },
              },
            },
          ],
          as: "rating",
        },
      },
      {
        $lookup: {
          from: "movies",
          let: {
            movieId: "$movieId", // $movieId is field of favorite table
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$movieId", "$_id"], // $_id is field of movie table
                },
              },
            },
            {
              $lookup: {
                from: "genres",
                as: "genre",
                localField: "genre", // localField - genre is field of movie table
                foreignField: "_id",
              },
            },
            {
              $unwind: {
                path: "$genre",
                preserveNullAndEmptyArrays: false,
              },
            },
            {
              $lookup: {
                from: "regions",
                as: "region",
                localField: "region", // localField - refion is field of movie table
                foreignField: "_id",
              },
            },
            {
              $unwind: {
                path: "$region",
                preserveNullAndEmptyArrays: false,
              },
            },
            {
              $project: {
                title: 1,
                image: 1,
                thumbnail: 1,
                type: 1,
                year: 1,
                media_type: 1,
                description: 1,
                runtime: 1,
                genre: "$genre.name",
                region: "$region.name",
              },
            },
          ],
          as: "movie",
        },
      },
      {
        $project: {
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
    ]);

    if (favorite.length > 0) {
      return res.status(200).json({ status: true, message: "Success", favorite });
    } else {
      return res.status(200).json({ status: false, message: "No data found." });
    }
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message || "Internal Server Error" });
  }
};
