// External Module
const express = require("express");
const snippetsRouter = express.Router();

// Local Module
const snippetsController = require("../controllers/snippetsController");
const { validationError } = require("../controllers/errors");

// Routes
snippetsRouter
  .route("/")
  .get(snippetsController.getSnippets)
  .post(snippetsController.createSnippet);

snippetsRouter
  .route("/:id")
  .get(snippetsController.getSnippet)
  .put(snippetsController.updateSnippet)
  .delete(snippetsController.deleteSnippet);

// Error handling middleware
snippetsRouter.use(validationError);

module.exports = snippetsRouter;
