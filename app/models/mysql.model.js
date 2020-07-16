const sql = require("./db.js");

// constructor
const CommitLog = function(commitLog) {

};

CommitLog.create = (newCommitLog, result) => {

  sql.query("INSERT INTO gitlinter SET ?", newCommitLog, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    //console.log("created commitlog: ", { id: res.insertId, ...newCommitLog });
    result(null, { id: res.insertId, ...newCommitLog });
  });
};




module.exports = CommitLog;