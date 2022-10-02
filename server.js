const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer')
const cTable = require("console.table");
const { response } = require('express');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

// THE MAIN PROMPT
const userPrompt = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all roles',
                'View all departments',
                'Add employee',
                'Add role',
                'Add department',
                'Update employee role',
                'Quit'
            ]
        }
    ])
        .then((results) => {
            const { choices } = results;

            if (choices === 'View all employees') {
                console.log('Viewing current employees');
                viewEmployees();
            }

            if (choices === 'View all roles') {
                console.log('Viewing current roles');
                viewRoles();
            }

            if (choices === 'View all departments') {
                console.log('Viewing current departments');
                viewDepartment();
            }

            if (choices === 'Add employee') {
                addEmployee();
            }

            if (choices === 'Add role') {
                addRole();
            }

            if (choices === 'Add department') {
                addDepartment();
            }

            if (choices === 'Update employee role') {
                editEmployee();
            }

            if (choices === 'Quit') {
                console.log('Are you sure you want to leave?');
            }

        })
};

// function to view the employees table
const viewEmployees = () => {

    db.query('SELECT * FROM employee', function (err, choices) {
        console.table(choices);
        userPrompt();
    });
};

// function to view the roles table
const viewRoles = () => {

    db.query('SELECT * FROM roles', function (err, choices) {
        console.table(choices);
        userPrompt();
    });
};

// function to view the roles table
const viewDepartment = () => {

    db.query('SELECT * FROM department', function (err, choices) {
        console.table(choices);
        userPrompt();
    });
};

// Function to add a new department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'What is the department name?',
            validate: (value) => {
                if (value) {
                    return true
                } else {
                    return 'Input is required!'
                }
            },
        }
    ]).then((response) => {
        // inserting the new department to the database
        db.query('INSERT INTO department(name) VALUES(?)', response.newDepartment, function (err, results) {
            console.log('Added ' + response.newDepartment + ' to the department database')
            userPrompt();
        });
    })
};

// function to add a new role
const addRole = () => {

    const departments = [];
    // retrieving the data for the departments table to use in the prompt
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;

        res.forEach(dep => {
            let depo = {
                name: dep.name,
                value: dep.id
            }
            departments.push(depo)
        })

    });

    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the name of the role?',
            validate: (value) => {
                if (value) {
                    return true
                } else {
                    return 'Input is required!'
                }
            },
        },
        {
            type: 'input',
            name: 'newSalary',
            message: 'What is their salery?',
            validate: (value) => {
                if (value) {
                    return true
                } else {
                    return 'Input is required!'
                }
            },
        },
        {
            type: 'list',
            name: 'selectDepo',
            message: 'What department is this role in?',
            choices: departments,
        },
    ]).then((response) => {
        // inserting the new role to the database
        db.query('INSERT INTO roles(title, salary, department_id) VALUES(?)',
            [[response.newRole, response.newSalary, response.selectDepo]], function (err, response) {
                if (err) throw err;
                console.log(`Successfully added ${response.newRole} to the database`);
                userPrompt();
            });
    })
};

// function to add a new employee
const addEmployee = () => {

    const roles = [];
    // retrieving the data for the roles table to use in the prompt
    db.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;

        res.forEach(role => {
            let newRole = {
                name: role.title,
                value: role.id
            }
            roles.push(newRole)
        })

    });

    const managers = [];
    // retrieving the data for the roles table to use in the prompt
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;

        res.forEach(role => {
            let manager = {
                name: role.first_name + ' ' + role.last_name,
                value: role.id
            }
            managers.push(manager)
        })

    });

    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employees first name?',
            validate: (value) => {
                if (value) {
                    return true
                } else {
                    return 'Input is required!'
                }
            },
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employees last name?',
            validate: (value) => {
                if (value) {
                    return true
                } else {
                    return 'Input is required!'
                }
            },
        },
        {
            type: 'list',
            name: 'roleList',
            message: 'What is the employees role?',
            choices: roles,
        },
        {
            type: 'list',
            name: 'managerList',
            message: 'Who is the employees managers?',
            choices: managers,
        },
    ]).then((response) => {
        // inserting the new employee to the database
        db.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?)',
            [
                [
                    response.firstName,
                    response.lastName,
                    response.roleList,
                    response.managerList
                ]
            ],
            function (err, response) {
                if (err) throw err;
                console.log(`Successfully added ${response.firstName} ${response.lastName} to the database`);
                userPrompt();
            });
    })
};

// function that will edit the employee
const editEmployee = () => {

    const employee = [];
    const roles = [];
    // retrieving the data for the employees table to use in the prompt
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;

        res.forEach(role => {
            let manager = {
                name: role.first_name + ' ' + role.last_name,
                value: role.id
            }
            employee.push(manager)
        })
        // retrieving the data for the roles table to use in the prompt
        db.query('SELECT * FROM roles', (err, res) => {
            if (err) throw err;

            res.forEach(role => {
                let editRole = {
                    name: role.title,
                    value: role.id
                }
                roles.push(editRole)
            })
        })
        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeList',
                message: 'Which employees role would you like to update?',
                choices: employee,
            },
            {
                type: 'list',
                name: 'roleList',
                message: 'W?',
                choices: roles,
            }
        ]).then((response) => {
            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
            const obj = [response.roleList, response.employeeList];

            db.query(sql, obj, function (err) {
                if (err) throw err;
                console.log(`Successfully Updated!`);
                userPrompt();
            })
        });


    })
}

userPrompt();
