const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    //data fetch
    const { sectionName, courseId } = req.body;
    //data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, missing section name or courseID",
      });
    }
    //create section
    const newSection = await Section.create({ sectionName });
    /**
     * update course schema with section Object ID
     */
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      { $push: { courseContent: newSection._id } },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    //HW use populate to replace sec/sub in updatedCourseDetails

    //return response

    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    console.error("Error occurred while creating a section", error);
    res.status(400).json({
      success: false,
      message: "Error occurred while creating a section",
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    // *!  data input
    const { sectionName, sectionId } = req.body;

    //data validation
    if (!sectionId || !sectionName) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    //update Data
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    //send response
    res.status(200).json({
      success: true,
      message: "Section updated successfully",
      updatedSection,
    });
  } catch (error) {
    console.error("Error occurred while updating the section");
    res.status(400).json({
      success: false,
      message: "Error occurred while updating the section",
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    //get ID from data - assuming that we are sending ID in params
    const sectionId = req.params;

    //use findByIdAndDelete
    await Section.findByIdAndDelete(sectionId);
    //TODO : Do we need to delete the entry from the course schema??

    //return response
    return res.status(200).json({
      success: true,
      message: "Section Deleted successfully",
    });
  } catch (error) {
    console.error("Error occurred while deleting the section");
    res.status(400).json({
      success: false,
      message: "Error occurred while deleting the section",
      error: error.message,
    });
  }
};
