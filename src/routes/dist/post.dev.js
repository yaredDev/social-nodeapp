"use strict";

var _require = require("../controllers"),
    ensureAuthenticated = _require.ensureAuthenticated;

var _require2 = require("express"),
    Router = _require2.Router;

var router = Router();

var multer = require("multer");

var _require3 = require("../config/multer"),
    uploadFile = _require3.uploadFile;

var _require4 = require("../controllers"),
    newPost = _require4.newPost,
    postComment = _require4.postComment;

router.post("/new", uploadFile.single("file"), ensureAuthenticated, newPost);
router.post("/comment/:PostId", ensureAuthenticated, postComment);
module.exports = router;