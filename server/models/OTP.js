const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60,
  },
});

//A func to send email - mongoose pre hook

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email from StudyNotion",
      otpTemplate(otp)
    );

    console.log("Email sent successfully", mailResponse);
  } catch (error) {
    console.error(
      `${__dirname}/${__filename} ---------------------->Error occurred while sending the email`,
      error
    );
    throw new Error(
      `${__dirname}/${__filename} ---------------------->Error occurred while sending the email`,
      error
    );
  }
}

OTPSchema.pre("save", async function (next) {
  console.log("The object going to insert into DB ", this);
  console.log("this.new is ", this.new);
  await sendVerificationEmail(this.email, this.otp); //Here this refers to document which we are going to save inside DB
  console.log("Passing the function to insert OTP into DB");
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);
