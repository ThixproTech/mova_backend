//express
const express = require("express");
const route = express.Router();

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../util/checkAccess");

//controller
const FAQController = require("./FAQ.controller");

//admin middleware
const AdminMiddleware = require("../middleware/admin.middleware");

//create FAQ
route.post("/create", AdminMiddleware, checkAccessWithSecretKey(), FAQController.store);

//update FAQ
route.patch("/update", AdminMiddleware, checkAccessWithSecretKey(), FAQController.update);

//delete FAQ
route.delete("/delete", AdminMiddleware, checkAccessWithSecretKey(), FAQController.destroy);

//get FAQ
route.get("/", checkAccessWithSecretKey(), FAQController.get);

module.exports = route;
