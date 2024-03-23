const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async (req, res) => {
  try {
    //get email from req body
    const email = req.body.email;
    //check if user exits and it's a valid email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Your email is not registered with us.",
      });
    }
    // generate token
    const token = crypto.randomUUID();
    //update user by adding token and expiration time

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    //create URL
    const url = `http://localhost:3000/update-password/${token}`;
    //send mail containing the URL
    await mailSender(
      email,
      "Password Reset Link",
      `Password Rest Link: ${url}`
    );

    //return response
    return res.status(200).json({
      success: true,
      message:
        "Email sent successfully, Please check mail your registered mail and change your password",
    });
  } catch (error) {
    console.error("Error occurred while sending the password reset token");
    res.status(500).json({
      success: false,
      message: "Error occurred while sending the password reset token",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    //data fetch
    const { password, confirmPassword, token } = req.body;
    //validation
    if (password !== confirmPassword) {
      res.status(400).json({
        success: false,
        message: "Password mismatch while updating",
      });
    }
    //get userDetails from db using token
    const userDetails = User.findOne({ token: token });
    //If no entry - invalid token
    if (!userDetails) {
      res.status(400).json({
        success: false,
        message: "Token is valid or User doesn't exists",
      });
    }
    //check token validity - expiration
    if (userDetails.resetPasswordExpires < Data.now()) {
      //Token expired
      return res.status(400).json({
        success: false,
        message: "Token is expired, Please try once again",
      });
    }
    //hash password
    const hasedPassword = await bcrypt.hash(password, 10);
    //password update
    await User.findOneAndUpdate(
      { token },
      { password: hasedPassword },
      { new: true }
    );
    //return response
    res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while updating the password",
    });
  }
};
