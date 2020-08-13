const { Router } = require("express");
const router = Router();

// Import controllers
const {
  ensureAuthenticated,
  LoginView,
  LogIn,
  Register,
  RegisterView,
  HomePage,
} = require("../controllers");

router.route("/login").get(LoginView).post(LogIn);

router.route("/register").get(RegisterView).post(Register);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You are logged out");
  res.redirect("/login");
});

// Register Route
router.post("/register", Register);

// Homepage route
router.get("/", ensureAuthenticated, HomePage);

module.exports = router;
