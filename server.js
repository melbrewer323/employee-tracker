const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'Root',
    database: 'empTracDB',
});

const start = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'toDo',
            message: "What would you like to do?",
            choices: ["Add department", "Add role", "Add Employee", "View departments", "View roles", "View employees", "Update employee roles", "Exit"]
        },
     
    ]);
};