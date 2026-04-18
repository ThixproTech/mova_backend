//express
const express = require("express");
const route = express.Router();

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../util/checkAccess");

//Controller
const SeasonController = require("./season.controller");

//admin middleware
const AdminMiddleware = require("../middleware/admin.middleware");

//get season
route.get("/", checkAccessWithSecretKey(), SeasonController.get);

//get season particular movieId wise
route.get("/movieIdWise", checkAccessWithSecretKey(), SeasonController.getIdWise);

//create season
route.post("/create", AdminMiddleware, checkAccessWithSecretKey(), SeasonController.store);

//update season
route.patch("/update", AdminMiddleware, checkAccessWithSecretKey(), SeasonController.update);

//delete season
route.delete("/delete", AdminMiddleware, checkAccessWithSecretKey(), SeasonController.destroy);

module.exports = route;
