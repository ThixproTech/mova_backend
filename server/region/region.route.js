//express
const express = require("express");
const route = express.Router();

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../util/checkAccess");

//Controller
const RegionController = require("./region.controller");

//admin middleware
const AdminMiddleware = require("../middleware/admin.middleware");

//create region from TMDB database
//route.post("/getStore", checkAccessWithSecretKey(), RegionController.getStore);

//create region
route.post("/create", AdminMiddleware, checkAccessWithSecretKey(), RegionController.store);

//update region
route.patch("/update", AdminMiddleware, checkAccessWithSecretKey(), RegionController.update);

//get region
route.get("/", checkAccessWithSecretKey(), RegionController.get);

//delete region
route.delete("/delete", AdminMiddleware, checkAccessWithSecretKey(), RegionController.destroy);

module.exports = route;
