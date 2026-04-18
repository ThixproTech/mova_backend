//express
const express = require("express");
const route = express.Router();

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../util/checkAccess");

//controller
const roleController = require("./role.controller");

//admin middleware
const AdminMiddleware = require("../middleware/admin.middleware");

//create role
route.post("/create", AdminMiddleware, checkAccessWithSecretKey(), roleController.store);

//update role
route.patch("/update", AdminMiddleware, checkAccessWithSecretKey(), roleController.update);

//delete role
route.delete("/delete", AdminMiddleware, checkAccessWithSecretKey(), roleController.destroy);

//get role
route.get("/", AdminMiddleware, checkAccessWithSecretKey(), roleController.get);

//get role movieId wise
route.get("/movieIdWise", AdminMiddleware, checkAccessWithSecretKey(), roleController.getIdWise);

module.exports = route;
