const asyncHandler = require("express-async-handler");
const passport = require("passport");

exports.login_get = asyncHandler(async (req, res, next) => {
  if (res.locals.currentUser) {
    res.redirect("/projects/show");
  }
  res.render("login");
});

exports.login_post = passport.authenticate("local", {
  successRedirect: "/projects/show",
  failureRedirect: "/login",
  failureMessage: "Can't find user with given credentials",
});

exports.user_log_out = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};
