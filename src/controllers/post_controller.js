const { Post, Comments } = require("../Database");
const fs = require("fs");

const newPost = async (req, res, next) => {
  const { postContent } = req.body;
  let postImage = null

  if (postImage == undefined || postImage==null) {
    postImage = "";
  }

  if (!postContent) {
    return;
  }

try {
    let post = await Post.create({
      contentText: postContent,
      postImg: postImage.filename,
      UserId: req.user.id,
    });

    if (post) {
      req.flash("success", "Successful");
      res.redirect("/");
    } else {
      req.flash("error", "An error has been encountered");
    }
} catch (error) {
  console.log(error)
}
};

const postComment = async (req, res, next) => {
  console.log(req.file);
  const { commentText } = req.body;

  if (!commentText) return;

  try {
    let comment = await Comments.create({
      cmtText: commentText,
      PostId,
    });

    if (comment) {
      req.flash("success", "Success");
      res.redirect("/");
    } else {
      req.flash("error", "Encountered error");
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { newPost, postComment };
