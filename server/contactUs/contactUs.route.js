//express
const express = require("express");
const route = express.Router();

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../util/checkAccess");

//controller
const contactController = require("./contactUs.controller");

//admin middleware
const AdminMiddleware = require("../middleware/admin.middleware");

//create contactUs
route.post("/create", AdminMiddleware, checkAccessWithSecretKey(), contactController.store);

//update contactUs
route.patch("/update", AdminMiddleware, checkAccessWithSecretKey(), contactController.update);

//delete contactUs
route.delete("/delete", AdminMiddleware, checkAccessWithSecretKey(), contactController.destroy);

//get contactUs
route.get("/", checkAccessWithSecretKey(), contactController.get);

module.exports = route;
