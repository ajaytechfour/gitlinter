const mysql = require("mysql");
const config = require('../config/default.json');

if ( config.app.Mysql === true ){
    // Create a connection to the database
   const connection = mysql.createConnection({
      host: config.app.MysqlConnectDetails.HOST,
      user: config.app.MysqlConnectDetails.USER,
      password: config.app.MysqlConnectDetails.PASSWORD,
      database: config.app.MysqlConnectDetails.DB
    });

    // open the MySQL connection
    connection.connect(error => {
      if (error) throw error;
      console.log("Successfully connected to the database.");
    });

    module.exports = connection;

}
