const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const OTPSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

//A func to send email - mongoose pre hook

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email from StudyNotion",
      otp
    );
    console.log("Email sent successfully", mailResponse);
  } catch (error) {
    console.error("Error occurred while sending the email", error);
  }
}

OTPSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp); //Here this refers to document which we are going to save inside DB
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);
