//express
const express = require("express");
const route = express.Router();

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../util/checkAccess");

//controller
const ShortVideoController = require("./shortVideo.controller");

//admin middleware
const AdminMiddleware = require("../middleware/admin.middleware");

//create shortVideo (movie or webseries wise)
route.post("/addShortVideo", AdminMiddleware, checkAccessWithSecretKey(), ShortVideoController.addShortVideo);

//update shortVideo (movie or webseries wise)
route.post("/modifyShortVideo", AdminMiddleware, checkAccessWithSecretKey(), ShortVideoController.modifyShortVideo);

//fetch shortVideos
route.get("/listShortVideos", AdminMiddleware, checkAccessWithSecretKey(), ShortVideoController.listShortVideos);

//fetch particular movie or webseries wise shortVideos
route.get("/fetchMediaContent", AdminMiddleware, checkAccessWithSecretKey(), ShortVideoController.fetchMediaContent);

//delete a short video
route.delete("/destroyShortMedia", AdminMiddleware, checkAccessWithSecretKey(), ShortVideoController.destroyShortMedia);

//update share count ( client )
route.patch("/incrementShortVideoShareCount", checkAccessWithSecretKey(), ShortVideoController.incrementShortVideoShareCount);

//get shortVideos ( client )
route.get("/fetchShortVideos", checkAccessWithSecretKey(), ShortVideoController.fetchShortVideos);

module.exports = route;
