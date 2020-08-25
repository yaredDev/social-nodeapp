const { Router } = require("express");
const router = Router();

const {profileView}=require('../controllers')

router.get("/", profileView);

module.exports = router;
