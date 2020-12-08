var mysql = require("mysql");
var inquirer = require("inquirer");
var conTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Houston1!",
    // communicate with actual database you are using
    database: "tracker_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    createQuestions();
  });

  function createQuestions() {
    inquirer.prompt([
        {
            
        }



    ])

  }