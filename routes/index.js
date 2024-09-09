var express = require("express");
var router = express.Router();
const projects = require("../controllers/projectController");
const users = require("../controllers/userController");

const url = process.env.MONGODB_URI;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/login");
});

router.get("/login", users.login_get);

router.post("/login", users.login_post);

router.get("/logout", users.user_log_out);

router.get("/projects", projects.projects_get);

router.get("/projects/show", projects.projects_show);

router.get("/project/create", projects.create_project_get);

router.post("/project/create", projects.create_project_post);

router.get("/project/:id", projects.project_edit_get);

router.post("/project/:id", projects.project_edit_post);

router.get("/project/:id/delete", projects.project_delete);

module.exports = router;
