const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/Employee.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const Manager = require("./lib/Manager.js");
const generateHTML = require("./src/templateHTML.js");

// function to generate HTML page file using file system 
const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        // if there is an error 
        if (err) {
            console.log(err);
            return;
            // when the profile has been created 
        } else {
            console.log("Mission Complete! Peep dist/index.html!")
        }
    })
};
//array containing objects constructed via userInput
const team = [];
//prompt chain
//initial prompt
const addManager = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                message: "What's the name of the manager?",
                name: "name"
            },
            {
                type: "input",
                message: "What's the managers id?",
                name: "id"
            },
            {
                type: "input",
                message: "Whats the managers email?",
                name: "email"
            },
            {
                type: "input",
                message: "Whats the office number?",
                name: "officeNumber"
            }

        ])
        .then(function (answers) {
            //create a manager object using userinputs and the Manager Constructor
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            //add it to the team array
            team.push(manager);
        })
};
//every subsequent prompt
const addEmployee = () => {
    return inquirer

        .prompt([
            {
                type: "confirm",
                name: "addAnotherEmployee",
                message: "Add another employee?",
            }, {
                when: response => {
                    return response.addAnotherEmployee == true
                },

                type: "input",
                name: "name",
                message: "What is the employees name?"
            }, {
                when: response => {
                    return response.addAnotherEmployee == true
                },

                type: "input",
                name: "id",
                message: "What is the employees ID"
            }, {
                when: response => {
                    return response.addAnotherEmployee == true
                },

                type: "input",
                name: "email",
                message: "What is the employees email?"
            }, {
                when: response => {
                    return response.addAnotherEmployee == true
                },

                type: "list",
                name: "employeeTitle",
                message: "What's the employee's title",
                choices: ["Engineer", "Intern"]

            },
            //when role is engineer, ask this question
            {
                when: input => {
                    return input.employeeTitle == "Engineer"
                },
                type: "input",
                name: "github",
                message: "Enter your github username:",
            },
            //when role is intern, ask this question
            {
                when: input => {
                    return input.employeeTitle == "Intern"
                },
                type: "input",
                name: "school",
                message: "What's the school you enrolled in ?",
            },

        ]).then(answers => {
            let employee
            //create an engineer/intern object depending on users selection. Add it to the team array. Otherwise log "No more employees!"
            if (answers.employeeTitle === "Engineer") {
                employee = new Engineer(answers.name, answers.id, answers.email, answers.github);
                team.push(employee);
                console.log(team);
            } else if (answers.employeeTitle === "Intern") {
                employee = new Intern(answers.name, answers.id, answers.email, answers.school);
                team.push(employee);
                console.log(team);
            } else {
                console.log("No more employees!");
            }
            //if the user answered yes to add another employee, ask them the question again, repeating the chain until the user says no. 
            if (answers.addAnotherEmployee == true) {
               return addEmployee()
            } else {
                return team;
            }
        })
};

//run the manager prompt, then run the employee prompt until user is done, then generate the contents of the HTML file depending on the users selected team, then write the file.
addManager()
    .then(addEmployee)
    .then(team => {
        return generateHTML(team);
    })
    .then(HTML => {
        return writeFile(HTML)
    })
    .catch(err => {
        console.log(err);
    });