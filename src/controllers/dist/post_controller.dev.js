"use strict";

var _require = require("../Database"),
    Post = _require.Post,
    Comments = _require.Comments;

var fs = require("fs");

var newPost = function newPost(req, res, next) {
  var postContent, postImage, post;
  return regeneratorRuntime.async(function newPost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          postContent = req.body.postContent;
          postImage = null;

          if (postImage == undefined || postImage == null) {
            postImage = "";
          }

          if (postContent) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return");

        case 5:
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(Post.create({
            contentText: postContent,
            postImg: postImage.filename,
            UserId: req.user.id
          }));

        case 8:
          post = _context.sent;

          if (post) {
            req.flash("success", "Successful");
            res.redirect("/");
          } else {
            req.flash("error", "An error has been encountered");
          }

          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](5);
          console.log(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 12]]);
};

var postComment = function postComment(req, res, next) {
  var commentText, comment;
  return regeneratorRuntime.async(function postComment$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(req.file);
          commentText = req.body.commentText;

          if (commentText) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return");

        case 4:
          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(Comments.create({
            cmtText: commentText,
            PostId: PostId
          }));

        case 7:
          comment = _context2.sent;

          if (comment) {
            req.flash("success", "Success");
            res.redirect("/");
          } else {
            req.flash("error", "Encountered error");
            res.redirect("/");
          }

          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](4);
          console.log(_context2.t0);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 11]]);
};

module.exports = {
  newPost: newPost,
  postComment: postComment
};