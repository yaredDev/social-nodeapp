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
          postImage = req.file;

          if (!(postImage == undefined)) {
            _context.next = 5;
            break;
          }

          postImage = "";
          return _context.abrupt("return", postImage);

        case 5:
          console.log("Post content working", postContent);
          console.log("File content working", postImage);

          if (postContent) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return");

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(Post.create({
            contentText: postContent,
            postImg: postImage.filename,
            UserId: req.user.id
          }));

        case 11:
          post = _context.sent;

          if (post) {
            req.flash("success", "Successful");
            res.redirect("/");
          } else {
            req.flash("error", "An error has been encountered");
          }

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
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