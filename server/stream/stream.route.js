//express
const express = require("express");
const route = express.Router();

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../util/checkAccess");

//Controller
const streamController = require("./stream.controller");

//admin middleware
const AdminMiddleware = require("../middleware/admin.middleware");

//create channel by admin if isIptvAPI switch on (true)
route.post("/create", AdminMiddleware, checkAccessWithSecretKey(), streamController.Store);

//create manual channel by admin
route.post("/manualCreate", AdminMiddleware, checkAccessWithSecretKey(), streamController.manualStore);

//get channel related data added by admin if isIptvAPI switch on (true)
route.get("/", checkAccessWithSecretKey(), streamController.get);

//update channel
route.patch("/update", AdminMiddleware, checkAccessWithSecretKey(), streamController.update);

//delete channel
route.delete("/delete", AdminMiddleware, checkAccessWithSecretKey(), streamController.destroy);

module.exports = route;
