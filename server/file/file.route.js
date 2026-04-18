//express
const express = require("express");
const route = express.Router();

//s3multer
const upload = require("../../util/uploadMiddleware");

//multipleUpload
const multipleUpload = require("../../util/uploadMultipleMiddleware");

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../util/checkAccess");

//controller
const FileController = require("./file.controller");

//upload content to digital ocean storage
route.post(
  "/upload-file",
  function (request, response, next) {
    upload(request, response, function (error) {
      if (error) {
        console.log("error in file ", error);
      } else {
        console.log("File uploaded successfully.");
        next();
      }
    });
  },
  checkAccessWithSecretKey(),
  FileController.uploadContent
);

//upload multiple content to digital ocean storage
route.post(
  "/bulkUploadContent",
  function (request, response, next) {
    multipleUpload(request, response, function (error) {
      if (error) {
        console.log("Error in file multipleUpload: ", error);
        return response.status(200).json({ status: false, message: error.message });
      } else {
        console.log("Multiple Files uploaded successfully.");
        next();
      }
    });
  },
  checkAccessWithSecretKey(),
  FileController.bulkUploadContent
);

module.exports = route;
