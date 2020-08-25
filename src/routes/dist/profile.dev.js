"use strict";

var _require = require("express"),
    Router = _require.Router;

var router = Router();

var _require2 = require('../controllers'),
    profileView = _require2.profileView;

router.get("/", profileView);
module.exports = router;