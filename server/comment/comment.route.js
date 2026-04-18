//express
const express = require("express");
const route = express.Router();

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../util/checkAccess");

//controller
const CommentController = require("./comment.controller");

//admin middleware
const AdminMiddleware = require("../middleware/admin.middleware");

//create comment
route.post("/create", checkAccessWithSecretKey(), CommentController.store);

//get comment list of movie for android
route.get("/getComment", checkAccessWithSecretKey(), CommentController.getComment);

//get comment list of movie for admin panel
route.get("/getComments", AdminMiddleware, checkAccessWithSecretKey(), CommentController.getComments);

//delete comment
route.delete("/", checkAccessWithSecretKey(), CommentController.destroy);

module.exports = route;
