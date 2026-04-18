//express
const express = require("express");
const route = express.Router();

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../util/checkAccess");

//controller
const AdvertisementController = require("./advertisement.controller");

//admin middleware
const AdminMiddleware = require("../middleware/admin.middleware");

//create advertisement
route.post("/create", AdminMiddleware, checkAccessWithSecretKey(), AdvertisementController.store);

//update advertisement
route.patch("/update", AdminMiddleware, checkAccessWithSecretKey(), AdvertisementController.update);

//get advertisement
route.get("/", checkAccessWithSecretKey(), AdvertisementController.getAdd);

//googleAdd handle on or off
route.patch("/googleAdd", AdminMiddleware, checkAccessWithSecretKey(), AdvertisementController.googleAdd);

module.exports = route;
