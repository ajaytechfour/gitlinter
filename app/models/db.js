const mysql = require("mysql");
//const dbConfig = require("../config/db.config.js");
const config = require('../config/default.json');

if ( config.app.Mysql === true ){
    // Create a connection to the database
   const connection = mysql.createConnection({
      host: config.app.MysqlConnectDetails.HOST,
      user: config.app.MysqlConnectDetails.USER,
      password: config.MysqlConnectDetails.db.PASSWORD,
      database: config.MysqlConnectDetails.db.DB
    });

    // open the MySQL connection
    connection.connect(error => {
      if (error) throw error;
      console.log("Successfully connected to the database.");
    });

    module.exports = connection;

}
