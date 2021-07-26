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
    .prompt({
            type: 'list',
            name: 'toDo',
            message: "What would you like to do?",
            choices: ["add department", "add role", "add employee", "view departments", "view roles", "view employees", "update employee role", "exit",
            ], 
    })
    .then((answer) => {
        switch (answer.toDo) {
            case 'add department':
                addDepartment();
                break;
            case 'add role':
                addRole();
                break;
            case 'add employee':
                addEmployee();
                break;
            case 'view departments':
                viewDepartments();
                break;
            case 'view roles':
                viewRoles();
                break;
            case 'view employees':
                viewEmployees();
                break;
            case 'update employee role':
                updateEmployeeRole();
                break;
            case 'exit':
                exit();
                break;                            
        }
    });
};

function addDepartment() {
    inquirer
    .prompt({
        type: 'input',
        name: 'addDepartment',
        message: "What is the department name?"
    })
    .then((answer) => {
        connection.query(`INSERT INTO department(name)
        VALUES("${answer.addDepartment}")`, (err, res) => {
            if (err) throw err;
            console.log(res);
            start();
        })
    })


};

function addRole() {
    inquirer
    .prompt([
    {
        type: 'input',
        name: 'title',
        message: "What is the employees title?"
    },
    {
        type: 'input',
        name: 'salary',
        message: "what is the salary?"
    },
    {
        type: 'input',
        name: 'department_id',
        message: "What is the department Id?"
    },     
    ])
    .then((answer) => {
        connection.query(`INSERT INTO role(title, salary, department_id)
        VALUES("${answer.title}", ${answer.salary}, ${answer.department_id})`, (err,res) => {
            if (err) throw err;
            console.log(res);
            start();
        })
    })
};

function addEmployee() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is employees first name?"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is employees last name?"
        },
        {
            type: 'input',
            name: 'role_id',
            message: "What is employee department Id?"
        },
    ])
    .then((answer) => {
        connection.query(`INSERT INTO employee(first_name, last_name, role_id)
        VALUES("${answer.first_name}", "${answer.last_name}", ${answer.role_id})`, (err,res) => {
            if (err) throw err;
            console.log(res);
            start();
        })
    })
};



function viewDepartments() {
    connection.query(`SELECT * FROM department`, (err,res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
};

function viewRoles() {
    connection.query(`SELECT * FROM role`, (err,res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
};

function viewEmployees() {
    connection.query(`SELECT * FROM employee`, (err,res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
};

function updateEmployeeRole() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'id',
            message: "What is the employee Id?"
        },
        {
            type: 'input',
            name: 'role_id',
            message: "What is employee new department Id?"
        },
    ])
    .then((answer) => {
        connection.query(`UPDATE employee SET role_id = ${answer.role_id} WHERE id = ${answer.id};`, (err,res) => {
            if (err) throw err;
            console.log(res);
            start();
        })
    })
    
};    




