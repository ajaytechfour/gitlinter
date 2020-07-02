// Create and Save a new Customer
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