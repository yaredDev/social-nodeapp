const { Router } = require("express");
const router = Router();

// Import controllers
const { LoginView, LogIn, Register, RegisterView, HomePage } = require("../controllers");

router.route("/login").get(LoginView).post(LogIn);

router.route("/register").get(RegisterView).post(Register);

// Register Route
router.post("/register", Register);

// Homepage route
router.get("/", HomePage);

module.exports = router;
