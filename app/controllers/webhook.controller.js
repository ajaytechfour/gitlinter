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

  LinterResponse  = linter(req.body.commits[0].message);

  const gitHookInbondData = {

          repositoryname : req.body.repository.name,
          commitmessage : req.body.commits[0].message,
          commitdatetime : req.body.commits[0].timestamp,
          committername : req.body.commits[0].committer.name,
          committeremail : req.body.commits[0].committer.email,
          committerusername : req.body.commits[0].committer.username,
          linterResponse : JSON.stringify(LinterResponse)

  }

  // Check for the mysql log
  if ( config.app.Mysql === true ) {

     const CommitLog = require("../models/mysql.model.js");

     CommitLog.create(gitHookInbondData, (err, data) => {

      });

  }

  // Check for the Outbondhook
  if ( config.linter.outbondhook === true ) {
    const OutBondHook = require("../models/outbondhook.js");
    OutBondHook(gitHookInbondData)


  }

    gitHookInbondData.linterResponse = LinterResponse

    res.send(gitHookInbondData);

};