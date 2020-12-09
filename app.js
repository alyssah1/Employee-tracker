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
    console.log("Welcome to the Employee Tracker!")
    inquirer.prompt([
        {
            message: "What would you like to do?",
            name: "choice",
            type: "list",
            choices: ["View All Employees", "Add Employees", "Remove Employees", "Update Employee Roles", "View All Roles", "Add Roles", "Remove Roles", "View All Departments", "Add Departments", "Remove Departments", "Exit"],
        }
      ]).then(function(answer) {
        switch (answer.choice) {
          case "View All Employees":
          allEmployees();
          break;
          case "View All Departments":
          allDepartments();
          break;
          case "View All Roles":
          allRoles();
          break;
          case "Add Employees":
          addEmployees();
          break;
          case "Add Roles":
          addRole();
          break;
          case "Add departments":
          addDepartment();
          break;
          case "Remove Employees":
          removeEmployees();
          break;
          case "Remove Roles":
          removeRoles();
          break;
          case "Remove Departments":
          removeDepartments();
          break;
          case "Exit":
          connection.end();
          break;                    
        }
      });
}

function allEmployees() {
  
}