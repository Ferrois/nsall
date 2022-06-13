const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  ethnicity: { type: String },
  nric: { type: String, required: true },
  id: { type: String, required: true },
  group: { type: String, required: true },
  medicalHist: { type: Array },
  ippt: { type: Object },
  leaves: { type: Array },
  loc: { type: Object },
  cdt: {type:Object}
});

module.exports = mongoose.model("user", UserSchema);
