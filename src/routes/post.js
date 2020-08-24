const { ensureAuthenticated } = require("../controllers");
const { Router } = require("express");
const router = Router();

const multer = require("multer");
const { uploadFile } = require("../config/multer");

const { newPost, postComment } = require("../controllers");

router.post(
  "/new_post",
  uploadFile.single("file"),
  ensureAuthenticated,
  newPost
);
router.post("/comment/:PostId", ensureAuthenticated, postComment);

module.exports = router;
