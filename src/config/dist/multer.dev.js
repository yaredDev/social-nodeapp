"use strict";

var multer = require("multer");

var path = require('path');

var dateNow = Date.now();
console.log("Display date ", dateNow);
var storage = multer.diskStorage({
  destination: path.resolve('src/public/uploads'),
  filename: function filename(req, file, cb) {
    cb(null, "".concat(dateNow, "-sogesha-").concat(file.originalname));
  }
});
var uploadFile = multer({
  storage: storage
});
module.exports = {
  uploadFile: uploadFile
};