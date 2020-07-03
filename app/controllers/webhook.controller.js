// Control Git lint
const config = require('../config/default.json');
exports.GitReciveCommit = (req, res) => {

// Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const repositoryName = req.body.repository.name
  const commitMessage = req.body.commits[0].message
  const commitdateTime = req.body.commits[0].timestamp
  const committerName = req.body.commits[0].committer.name
  const committerEmail = req.body.commits[0].committer.email
  const committerUsername = req.body.commits[0].committer.username

  if ( config.app[0].Mysql === true ) {
        const CommitLog = require("../models/webhook.controller.js");

        const commitLog = new CommitLog({
                repositoryname: req.body.repository.name,
                commitdatetime: req.body.commits[0].timestamp,
                commitmessage: req.body.commits[0].message,
                committername: req.body.commits[0].committer.name,
                committeremail: req.body.commits[0].committer.email,
                committerusername: req.body.commits[0].committer.username
        });

          // Save Customer in the database
          Customer.create(customer, (err, data) => {
            if (err)
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Customer."
              });
            else res.send(data);
          });

  }

  if ( config.app[0].linthook === true ) {

    var options = {
              host: url,
              port: 80,
              path: '/resource?id=foo&bar=baz',
              method: 'POST'
            };

        http.request(options, function(res) {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
          });
        }).end();


  }

    //res.send(req.body);
    res.json({ lintstatus: true,
                lintmessage: 'commit message is ok',
                repository: repositoryName,
                commitdatetime: commitdateTime,
                commitmessage: commitMessage,
                committername: committerName,
                committeremail: committerEmail,
                committerusername: committerUsername

     })

};