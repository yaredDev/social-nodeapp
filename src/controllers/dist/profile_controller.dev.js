"use strict";

var _require = require("../Database"),
    User = _require.User,
    Post = _require.Post,
    Comments = _require.Comments;

var profileView = function profileView(req, res, next) {
  return regeneratorRuntime.async(function profileView$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            res.render("profile");
          } catch (error) {
            console.log(error);
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  profileView: profileView
};