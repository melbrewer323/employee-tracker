const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Root',
    database: 'empTracDB',
});

connection.connect((err) => {
    if (err) throw err;
    start();
  });

const start = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'toDo',
            message: "What would you like to do?",
            choices: ["Add department", "Add role", "Add Employee", "View departments", "View roles", "View employees", "Update employee role", "Exit"]
        },
     
    ])
    .then((anser) => {
        switch (anser.action) {
            case 'Add department':
                addDepartment();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'View departments':
                viewDepartments();
                break;
            case 'View roles':
                viewRoles();
                break;
            case 'View employees':
                viewEmployees();
                break;
            case 'Update employee role':
                updateEmployeeRole();
                break;
            case 'Exit':
                Exit();
                break;                            
        }
    });
};
