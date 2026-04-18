//express
const express = require("express");
const route = express.Router();

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../util/checkAccess");

//controller
const otpController = require("./otp.controller");

//generate OTP and send the email for password security (Email-password)
route.post("/sendPasswordResetOtp", checkAccessWithSecretKey(), otpController.sendPasswordResetOtp);

//generate otp when user login (Email-password)
route.post("/initiateLoginOtp", checkAccessWithSecretKey(), otpController.initiateLoginOtp);

//verify the OTP
route.get("/checkOtpValidity", checkAccessWithSecretKey(), otpController.checkOtpValidity);

module.exports = route;
