const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const emplyeeSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number },
  password: { type: Array, required: true },
  confirmpassword: { type: Array, required: true },
  gender: { type: String, required: true },
});

//generating tokens

emplyeeSchema.methods.generateAuthToken = async function () {
  try {
  } catch (err) {}
};

//converting password into hash
emplyeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(`current password is ${this.password}`);
    this.password = await bcrypt.hash(String(this.password), 10);
    console.log(`current password is ${this.password}`);
    this.confirmpassword = undefined;
  }
  next();
});

//creating collection

const Register = mongoose.model("Register", emplyeeSchema);

module.exports = Register;
