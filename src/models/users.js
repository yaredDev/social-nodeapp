const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  username: {
    type: String,
    required: [true, "Username is requied"],
    unique: [true, "Username must be unique"],
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
  },
  birthdate: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  },
  profilePic: {
    data: Buffer,
    contentType: String,
  },
  regiteredAt: {
    type: Date,
    default: Date.now,
  },
});

// Password encryprion. Will be done before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Schema function for comparing the password
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Export schema
module.exports = model("User", UserSchema);
