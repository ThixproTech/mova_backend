//express
const express = require("express");
const route = express.Router();

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../util/checkAccess");

//controller
const GenreController = require("./genre.controller");

//admin middleware
const AdminMiddleware = require("../middleware/admin.middleware");

//create genre from TMDB database
//route.post("/getStore", checkAccessWithSecretKey(), GenreController.getStore);

//create genre
route.post("/create", AdminMiddleware, checkAccessWithSecretKey(), GenreController.store);

//update genre
route.patch("/update", AdminMiddleware, checkAccessWithSecretKey(), GenreController.update);

//delete genre
route.delete("/delete", AdminMiddleware, checkAccessWithSecretKey(), GenreController.destroy);

//get genre
route.get("/", checkAccessWithSecretKey(), GenreController.get);

module.exports = route;
