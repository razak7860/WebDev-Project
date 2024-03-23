const Tag = require("../models/Tag");
exports.createTag = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const tagDetails = await Tag.create({
      name,
      description,
    });
    console.log("Tag created successfully", tagDetails);
    res.status(200).json({
      success: true,
      message: "Tag created successfully",
    });
  } catch (error) {
    console.error("Error occurred while creating  a Tag");
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Get all Tags
exports.showAllTags = async (req, res) => {
  try {
    const allTags = await Tag.find({}, { name: true, description: true });
    res.status(200).json({
      success: true,
      message: "All tags returned",
      allTags,
    });
  } catch (error) {
    console.error("Error occurred while fetching the tags");
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
