module.exports = app => {
  const webhook = require("../controllers/webhook.controller.js");

  // Recive Git Commit Details from github
  app.post("/api/v1/resources/github/webhook", webhook.GitReciveCommit);

};