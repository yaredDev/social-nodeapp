const flashMiddleware = async (req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
};

module.exports = { flashMiddleware };
