const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.sendOTP = async (req, res) => {
  try {
    //Fetch the email from the body
    const { email } = req.body;
    //check if already exists as this is for signUp
    const checkUserPresent = await User.findOne({ email });

    //if user already exits then return a response
    if (checkUserPresent) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    //generate OTP as user is not registered
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("OTP is generated", otp);
    //check OTP is unique or not ----------------####### Explore further is this required???
    const result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };

    //create an entry in DB for OTP
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP body is ", otpBody);

    //return success response
    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (error) {
    console.error("Error occurred when sending the OTP", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//SIGN UP
exports.signUp = async (req, res) => {
  try {
    //data fecth from request body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;
    //validate the data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //match 2 passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and confirm password doesn't match, Please try again",
      });
    }
    //check if user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already password",
      });
    }
    //find most recent OTP stored for the user
    const recentOTP = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log("Recent OTP is", recentOTP);
    //validate OTP
    if (recentOTP.length === 0) {
      //OTP not found
      return res.status(400).json({
        success: false,
        message: "OTP Not Found",
      });
    } else if (otp !== recentOTP.otp) {
      res.status(400).json({
        success: false,
        message: "OTP entered is incorrect",
      });
    }
    // Hash Password
    const hasedPassword = await bcrypt.hash(password, 10);
    //Entry in DB
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hasedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    //return response
    res.status(200).json({
      success: true,
      message: "User is registered successfully",
      user,
    });
  } catch (error) {
    console.error("Error occurred while creating a user");
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    //get data from req body
    const { email, password } = req.body;

    //validation data
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, Please try again ",
      });
    }
    //user exists or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exists. Please register!!",
      });
    }
    //generate JWT after password matching
    if (await bcrypt.compare(password, user.password)) {
      payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = "############";
      //create cookie and send response
      const options = {
        expires: new Date.now() + 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Credentials are invalid",
      });
    }
  } catch (error) {
    console.error("Error occurred while verifying the credentials", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ChangePassword
exports.changePassword = async (req, res) => {
  //get data from req body
  //get old password, new Password, confirm NewPassword
  //validation
  //update pwd in DB
  //send mail - password updated
  //return response
};
