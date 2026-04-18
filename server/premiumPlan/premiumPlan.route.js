//express
const express = require("express");
const route = express.Router();

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../util/checkAccess");

//controller
const premiumPlanController = require("./premiumPlan.controller");

//admin middleware
const AdminMiddleware = require("../middleware/admin.middleware");

//get premiumPlanHistory of particular user (user)
route.get("/planHistoryOfUser", checkAccessWithSecretKey(), premiumPlanController.planHistoryOfUser);

//create PremiumPlan
route.post("/create", AdminMiddleware, checkAccessWithSecretKey(), premiumPlanController.store);

//update PremiumPlan
route.patch("/update", AdminMiddleware, checkAccessWithSecretKey(), premiumPlanController.update);

//delete PremiumPlan
route.delete("/delete", AdminMiddleware, checkAccessWithSecretKey(), premiumPlanController.destroy);

//get PremiumPlan
route.get("/", checkAccessWithSecretKey(), premiumPlanController.index);

//create PremiumPlanHistory
route.post("/createHistory", checkAccessWithSecretKey(), premiumPlanController.createHistory);

//get premiumPlanHistory of user (admin)
route.get("/history", checkAccessWithSecretKey(), premiumPlanController.premiumPlanHistory);

//payment via stripe
route.post("/handleStripeWebPayment", checkAccessWithSecretKey(), premiumPlanController.handleStripeWebPayment);

module.exports = route;
