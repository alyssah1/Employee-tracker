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

connection.connect(function (err) {
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
      choices: ["View All Employees", "Add Employees", "Update Employees Roles", "View All Roles", "Add Roles", "View All Departments", "Add Departments", "Exit"],
    }
  ]).then(function (answer) {
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
      case "Update Employees Roles":
        updateRole();
        break;
      case "Exit":
        console.log("Goodbye!");
        connection.end();
        break;
    }
  });
}

function allEmployees() {
  connection.query(`SELECT employees.id, first_name, last_name, roles.title, roles.salary FROM employees INNER JOIN roles ON role_id = roles.id`, (err, result) => {
    if (err) console.log(err);
    console.table(result);
    createQuestions();
  });
}

function allDepartments() {
  connection.query(`SELECT * FROM departments`, (err, result) => {
    if (err) console.log(err);
    console.table(result);
    createQuestions();
  });
}


function allRoles() {
  connection.query(`SELECT roles.id, title, salary, departments.name FROM roles INNER JOIN departments ON department_id = departments.id`, (err, result) => {
    if (err) console.log(err);
    console.table(result);
    createQuestions();
  });
}

function addEmployees() {
  inquirer.prompt([
    {
      name: "firstName",
      message: "What is your first name?",
      type: "input",
    },
    {
      name: "lastName",
      message: "What is your last name?",
      type: "input",
    },
    {
      name: "roleID",
      message: "What is your role id?",
      type: "input",
    },
    {
      name: "role",
      message: "What role would you like to add?",
      type: "list",
      choices: ["Sales Lead", "Software engineer", "Accountant", "Lawyer"],
    },
  ]).then((answers) => {
    connection.query(`INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)`,
      [answers.firstName, answers.lastName, answers.roleID, answers.role],
      (err, result) => {
        if (err) console.log(err);
        console.log("Success!");
        createQuestions();
      }
    )
  })
}

function addRole() {
  inquirer.prompt([
    {
      name: "title",
      message: "Enter the role you would like to add.",
      type: "input",
    },
    {
      name: "salary",
      message: "Enter the annual salary of the new role.",
      type: "input",
    },
    {
      name: "departmentID",
      message: "Enter the department id.",
      type: "input",
    },
  ]).then((answers) => {
    connection.query(`INSERT INTO roles(title, salary, department_id) VALUES (?, ?, ?)`,
      [answers.title, answers.salary, answers.departmentID],
      (err, result) => {
        console.log("Success!");
        createQuestions();
      }
    )
  })
}

function addDepartment() {
  inquirer.prompt([
    {
      name: "name",
      message: "What department would you like to add?",
      type: "input",
    },
  ]).then((answers) => {
    connection.query(`INSERT INTO departments SET (?)`),
      [answers.name],
      (err, result) => {
        console.log("Success!");
        createQuestions();
      }
  })
}

