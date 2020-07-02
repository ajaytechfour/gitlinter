const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
const config = require('../config/default.json');

//console.log(config.app.Mysql)

//let checkMysql = config.app.Mysql;

if ( config.app.Mysql === true ){
    // Create a connection to the database
    const connection = mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USER,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB
    });

    // open the MySQL connection
    connection.connect(error => {
      if (error) throw error;
      console.log("Successfully connected to the database.");
    });

    module.exports = connection;

}
