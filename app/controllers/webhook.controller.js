// Control Git lint
const config = require('../config/default.json');
const linter = require('../models/commitlinter.js');
exports.GitReciveCommit = (req, res) => {

// Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  lintMessage  = linter(req.body.commits[0].message)

  const gitHookInbondData = {
          repositoryname : req.body.repository.name,
          commitmessage : req.body.commits[0].message,
          commitdatetime : req.body.commits[0].timestamp,
          committername : req.body.commits[0].committer.name,
          committeremail : req.body.commits[0].committer.email,
          committerusername : req.body.commits[0].committer.username
  }

  // Check for the mysql log
  if ( config.app.Mysql === true ) {
        const CommitLog = require("../models/webhook.model.js");

    CommitLog.create(gitHookInbondData, (err, data) => {

      });

  }

  // Check for the Outbondhook
  if ( config.app.outbondhook === true ) {
    const OutBondHook = require("../models/outbondhook.js");
    OutBondHook(gitHookInbondData)


  }


    res.send(gitHookInbondData);

};