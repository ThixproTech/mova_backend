//express
const express = require("express");
const route = express.Router();

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../util/checkAccess");

//controller
const settingController = require("./setting.controller");

//admin middleware
const AdminMiddleware = require("../middleware/admin.middleware");

//update Setting
route.patch("/update", AdminMiddleware, checkAccessWithSecretKey(), settingController.update);

//handle setting switch
route.patch("/", AdminMiddleware, checkAccessWithSecretKey(), settingController.handleSwitch);

//get setting data
route.get("/", checkAccessWithSecretKey(), settingController.index);

//handle update storage
route.patch("/toggleStorageOption", AdminMiddleware, checkAccessWithSecretKey(), settingController.toggleStorageOption);

module.exports = route;
