//express
const express = require("express");
const route = express.Router();

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../util/checkAccess");

//controller
const ContentPageController = require("./contentPage.controller");

//admin middleware
const AdminMiddleware = require("../middleware/admin.middleware");

route.post("/insertContentPage", AdminMiddleware, checkAccessWithSecretKey(), ContentPageController.insertContentPage);

route.patch("/modifyContentPage", AdminMiddleware, checkAccessWithSecretKey(), ContentPageController.modifyContentPage);

route.get("/listContentPages", checkAccessWithSecretKey(), ContentPageController.listContentPages);

route.get("/retrievePageByTitle", checkAccessWithSecretKey(), ContentPageController.retrievePageByTitle);

route.delete("/removeContentPage", AdminMiddleware, checkAccessWithSecretKey(), ContentPageController.removeContentPage);

module.exports = route;
