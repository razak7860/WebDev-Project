const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  about: {
    type: String,
  },
  contactNumber: {
    type: Number,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
