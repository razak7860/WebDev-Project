const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//Create Course Handler functions
exports.createCourse = async (req, res) => {
  try {
    //Fetch the Data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
    } = req.body;

    //get thumbnail
    const thumbnail = req.files.thumbnailImage;

    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //Check for instructor - Because when creating a course we need to add the instructor
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    console.log("Instructor details are --> ", instructorDetails);
    //TODO: Verify that UserID and instructorDetails are same or different

    if (!instructorDetails) {
      return res.status(400).json({
        success: false,
        message: "Instructor details not found",
      });
    }
    //check given category is valid or not
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "Category details not found",
      });
    }

    //Upload Image to Cloudinary

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //create an entry for new Course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    //Add the new course to user schema of Instructor

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      {
        new: true,
      }
    );

    //Update Tag schema as Tag contains all courses related to that tag

    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to create a course",
      error: error.message,
    });
  }
};

//get All courses handler function
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {}, //To find all courses by ID
      {
        courseDescription: true,
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReview: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();
    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Can't Fetch the course data",
      error: error.message,
    });
  }
};

//getCourse Details
exports.getCourseDetails = async (req, res) => {
  try {
    //Get the course ID
    const { courseId } = req.body;
    //find course Details
    const courseDetails = await Course.findById({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    ///validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Course Details fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.error("Error occurred while fetching the data");
    res.status(400).json({
      success: false,
      message: "Error occurred while fetching the data",
      error: error.message,
    });
  }
};