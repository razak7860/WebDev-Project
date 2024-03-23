const mongoose = require("mongoose");
const ratingAndReviewsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
  },
});

module.exports = mongoose.model("RatingAndUser", ratingAndReviewsSchema);
