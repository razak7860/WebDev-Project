const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
  try {
    //get Data from request
    const {
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body;

    //get User ID
    const id = req.user.id;

    //validation
    if (!dateOfBirth || !about || !contactNumber || !gender) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //Find profile
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;

    //update Profile

    // !Another way of updating the object into DB
    const profileDetails = await Profile.findById(profileId);
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;

    const updatedProfile = await profileDetails.save();

    //return response
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedProfile,
    });
  } catch (error) {
    console.error("Error occurred while updating profile");
    res.status(400).json({
      success: false,
      message: "Error occurred while updating profile",
      error: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    //get User Id from the middleware
    const id = req.user.id;

    //validation
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //delete profile
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

    //TODO Uneroll the user from all enrolled courses

    //delete User
    await User.findByIdAndDelete({ _id: id });

    //return response
    return res.status(200).json({
      success: true,
      message: "User Deleted successfully",
    });
  } catch (error) {
    console.error("Error occurred while deleting the account");
    res.status(400).json({
      success: false,
      message: "Error occurred while deleting the account",
      error: error.message,
    });
  }
};

//Get enrolled courses for a user
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate("courses")
      .exec();
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Update profile picture
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get all user details
exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    console.log(userDetails);
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
