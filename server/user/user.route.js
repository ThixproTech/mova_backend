//express
const express = require("express");
const route = express.Router();

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../util/checkAccess");

//controller
const UserController = require("./user.controller");

//admin middleware
const AdminMiddleware = require("../middleware/admin.middleware");

//user login and sign up
route.post("/login", checkAccessWithSecretKey(), UserController.store);

//get user profile who login
route.get("/profile", checkAccessWithSecretKey(), UserController.getProfile);

//get all user for admin panel
route.get("/", AdminMiddleware, checkAccessWithSecretKey(), UserController.get);

//update profile of user
route.patch("/update", checkAccessWithSecretKey(), UserController.updateProfile);

//get countryWise user
route.get("/countryWiseUser", checkAccessWithSecretKey(), UserController.countryWiseUser);

//user block or unbolck
route.patch("/blockUnblock", AdminMiddleware, checkAccessWithSecretKey(), UserController.blockUnblock);

//delete user account
route.delete("/deleteUserAccount", checkAccessWithSecretKey(), UserController.deleteUserAccount);

module.exports = route;
