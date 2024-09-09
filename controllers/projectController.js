const Project = require("../models/project");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");

exports.projects_get = asyncHandler(async (req, res, next) => {
  const projects = await Project.find();

  if (projects === null) {
    const err = new Error("No projects found.");
    err.status = 404;
    return next(err);
  }

  res.json(projects);
});

exports.create_project_get = asyncHandler(async (req, res, next) => {
  if (!res.locals.currentUser) {
    res.redirect("/login");
  }
  res.render("project_form", {
    title: "Create project",
    user: res.locals.currentUser,
  });
});

exports.create_project_post = asyncHandler(async (req, res, next) => {
  const newProject = new Project({
    name: req.body.name,
    desc: req.body.desc,
    liveUrl: req.body.liveUrl,
    repoUrl: req.body.repoUrl,
    img: req.body.image,
  });

  await newProject.save();

  res.redirect("/");
});

exports.projects_show = asyncHandler(async (req, res, next) => {
  const projects = await Project.find();
  res.render("projects", { projects, user: res.locals.currentUser });
});

exports.project_edit_get = asyncHandler(async (req, res, next) => {
  if (!res.locals.currentUser) {
    res.redirect("/login");
  }

  const project = await Project.findById(req.params.id).exec();

  if (project === null) {
    const err = new Error("Project not found");
    err.status = 404;
    return next(err);
  }

  res.render("project_form", {
    title: "Edit post",
    user: res.locals.currentUser,
    project: project,
  });
});

exports.project_edit_post = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id).exec();

  if (project === null) {
    const err = new Error("Project not found");
    err.status = 404;
    return next(err);
  }

  const newProject = new Project({
    name: req.body.name,
    desc: req.body.desc,
    liveUrl: req.body.liveUrl,
    repoUrl: req.body.repoUrl,
    img: req.body.image,
    _id: req.params.id,
  });

  await Project.findByIdAndUpdate(req.params.id, newProject, {}).exec();

  res.redirect("/projects/show");
});

exports.project_delete = asyncHandler(async (req, res, next) => {
  await Project.findByIdAndDelete(req.params.id).exec();
  res.redirect("/projects/show");
});
