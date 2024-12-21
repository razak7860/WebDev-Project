const Category = require("../models/Category");
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const categoryDetails = await Category.create({
      name,
      description,
    });
    console.log("category created successfully", categoryDetails);
    res.status(200).json({
      success: true,
      message: "category created successfully",
      data: categoryDetails,
    });
  } catch (error) {
    console.error("Error occurred while creating  a category");
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Get all Category
exports.showAllCategories = async (req, res) => {
  try {
    const allCategory = await Category.find(
      {},
      { name: true, description: true }
    );
    res.status(200).json({
      success: true,
      message: "All Category returned",
      allCategory,
    });
  } catch (error) {
    console.error("Error occurred while fetching the Category");
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//categoryPageDetails

exports.categoryPageDetails = async (req, res) => {
  try {
    //get category Id
    const { categoryId } = req.body;
    //get courses for specified categoryId
    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();
    //validation
    if (!selectedCategory) {
      res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }
    //get courses for different categories
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      .exec();

    //get top selling courses
    //return response
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
      },
    });
  } catch (error) {
    console.error("Error occurred while fetching category page details");
    return res.status(400).json({
      success: false,
      message: "Error occurred while fetching category page details",
      error: error.message,
    });
  }
};
