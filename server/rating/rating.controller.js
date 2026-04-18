const Rating = require("../rating/rating.model");

//import model
const User = require("../user/user.model");
const Movie = require("../movie/movie.model");

//mongoose
const mongoose = require("mongoose");

//create rating
exports.addRating = async (req, res) => {
  try {
    const { movieId, userId, rating } = req.query;

    if (!movieId || !userId || !rating) {
      return res.status(200).json({ status: false, message: "Oops! Invalid details!!" });
    }

    if (!mongoose.Types.ObjectId.isValid(movieId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(200).json({ status: false, message: "Invalid userId or movieId format!" });
    }

    const [user, movie, ratingExist] = await Promise.all([
      User.findById(userId),
      Movie.findById(movieId),
      Rating.findOne({
        userId: userId,
        movieId: movieId,
      }),
    ]);

    if (!user) {
      return res.status(200).json({ status: false, message: "User does not found!!" });
    }

    if (!movie) {
      return res.status(200).json({ status: false, message: "No Movie Was Found!!" });
    }

    if (ratingExist) {
      return res.status(200).json({ status: false, message: "You have already rated this movie!!" });
    }

    const newRating = new Rating({
      userId: user._id,
      movieId: movie._id,
      rating: Number(rating),
    });

    await newRating.save();

    return res.status(200).json({
      status: true,
      message: "Rating added successfully!!",
      rating: newRating,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: error.message || "Internal Server Error" });
  }
};

//get rating
exports.getRating = async (req, res) => {
  try {
    const totalRating = await Rating.aggregate([
      {
        $group: {
          _id: "$movieId",
          totalUser: { $sum: 1 }, //totalRating by user
          avgRating: { $avg: "$rating" },
        },
      },
      { $sort: { avgRating: -1 } },
    ]);

    return res.status(200).json({ status: true, message: "Success!!", totalRating });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message || "Internal Server Error!!" });
  }
};
