const RatingAndReview = require("../models/RatingAndReview");

const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

exports.createRating = async (req, res) => {
  try {
    //get User id
    const userId = req.user.id;
    //fetchData from req.body
    const { rating, review, courseId } = req.body;
    //check if user is enrolled or not  --> Using element match and equality operator
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentEnrolled: { $elematch: { $eq: userId } },
    });
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "Student is not enrolled in the course",
      });
    }

    //check if user already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course is already reviewed by the User",
      });
    }
    //create rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    //update course with this rating
    await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: { ratingAndReviews: ratingReview._id },
      },
      { new: true }
    );
    //return response
    return res.status(200).json({
      success: true,
      message: "Rating and Review created successfully",
      ratingReview,
    });
  } catch (error) {
    console.error("Error occurred while creating rating");
    return res.status(400).json({
      success: false,
      error: error.message,
      message: "Error occurred while creating rating",
    });
  }
};

//Handler for get Avg rating
exports.getAverageRating = async (req, res) => {
  try {
    //get course ID
    const { courseId } = req.body;
    //calculate Avg rating
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    //validation on the aggregation query
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Average Rating is 0, no ratings given till now",
        averageRating: 0,
      });
    }
  } catch (error) {
    console.error("Error occurred while calculating the Average Rating");
    res.status(400).json({
      success: false,
      message: "Error occurred while calculating the Average Rating",
      error: error.message,
    });
  }
};

//Handler for RatingAndReviews
exports.getAllRating = async (req, res) => {
  try {
    const allReview = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        // *! Explore more further
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allReview,
    });
  } catch (error) {
    console.error("Error occurred while fetching all rating");
    res.status(400).json({
      success: false,
      error: error.message,
      message: "Error occurred while fetching all rating",
    });
  }
};
