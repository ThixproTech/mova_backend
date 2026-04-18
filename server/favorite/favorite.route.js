//express
const express = require("express");
const route = express.Router();

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../util/checkAccess");

//controller
const FavoriteController = require("./favorite.controller");

//create Favorite [Only User can do favorite]
route.post("/", checkAccessWithSecretKey(), FavoriteController.store);

//get Favorite List [For Android]
route.get("/favoriteMovie", checkAccessWithSecretKey(), FavoriteController.getFavoriteList);

module.exports = route;
