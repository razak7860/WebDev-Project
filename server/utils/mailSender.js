const nodemailer = require("nodemailer");
const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: "StudyNotion - by Razak",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    console.log("mailSender.js -------> mail sent and info is ", info);
    return info;
  } catch (error) {
    console.log(
      `${__dirname}/${__filename} Error occurred while sending an email`,
      error
    );
    throw new Error(
      `${__dirname}/${__filename} Error occurred while sending an email`,
      error
    );
  }
};

module.exports = mailSender;
