const inquirer = require('inquirer');
const fs = require('fs');
const { generateHTML } = require('./src/generateHTML');
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");

const teamData = [];
const managerData = [];
const engineerData = [];
const internData = [];
const currentID = 1;

const employeeQuestions = [
    {
        type: 'input',
        message: 'Enter the name:',
        name: 'name'
    },
    {
        type: 'list',
        message: 'Select position:',
        name: 'role',
        choices: ['Manager', 'Engineer', 'Intern']
    },
    {
        type: 'input',
        message: 'Enter the email:',
        name: 'email'
    },
];

const roleQuestions = [
    {
        type: 'input',
        message: 'What is the office number?:',
        name: 'officeNum'
    },
    {
        type: 'input',
        message: 'Enter the github username:',
        name: 'github'
    },
    {
        type: 'input',
        message: 'Enter the school this intern is attending/graduated from:',
        name: 'school'
    },
];


// Write HTML File
function writeToFile(fileName, data) {
    fs.writeFile(
        fileName,
        generateHTML(data),
        (err) => err ? console.error(err)
            : console.log('HTML Written! You may find it in dist/team-profile.html!')
    )
}

// Create a function to initialize app
// https://www.reddit.com/r/node/comments/9q3chw/looping_inquirerjs_prompts/
// https://stackoverflow.com/questions/45060200/in-node-js-how-do-i-create-a-prompt-loop-using-inquirer
function mainMenuPrompt() {
    return inquirer
        .prompt(
            {
                type: 'list',
                message: "Welcome to Team Profile Generator! What would you like to do?",
                name: 'menu',
                choices: ['Print Current Team Members', 'Add a Team Member', 'Remove a Team Member', 'Clear Team List', 'Write HTML File', 'EXIT']
            }
        )
        .then(response => {
            switch (response.menu) {
                case 'Print Current Team Members':
                    console.log('\n-------------\n');
                    printTeam();
                    break;
                case 'Add a Team Member':
                    console.log('\n-------------\n');
                    addTeam();
                    break;
                case 'Remove a Team Member':
                    console.log('\n-------------\n');
                    removeRole();
                    break;
                case 'Clear Team List':
                    console.log('\n-------------\n');
                    clearTeam();;
                    break;
                case 'Write HTML File':
                    writeToFile('./dist/team-profiles.html', teamData)
                    break;
                case 'EXIT':
                    break;
            }
        });
}

function printTeam() {
    console.log('Current Team Members: \n');
    console.log(teamData);
    console.log('\n-------------\n');
    mainMenuPrompt();
}

function addTeam() {
    return inquirer
        .prompt(employeeQuestions)
        .then(response => {
            const currentTeamMember = [response.name, currentID, response.email]
            currentID++;
            switch (response.role) {
                case 'Manager':
                    addManager(currentTeamMember);
                    break;
                case 'Engineer':
                    addEngineer(currentTeamMember);
                    break;
                case 'Intern':
                    addIntern(currentTeamMember);
                    break;
            }
        });
}

function addManager(member) {
    return inquirer
        .prompt(roleQuestions[0])
        .then(response => {
            let name = member[0].trim();
            let id = member[1];
            let email = member[2].trim();
            let officeNum = response.officeNum;
            try {
                managerData.push(new Manager(name, id, email, parseInt(officeNum)));
                teamData = [managerData, engineerData, internData];
                console.log('\x1b[32m', `Manager ${name} added, returning to main menu!`);
                console.log('\n-------------\n');
                mainMenuPrompt();
            } catch (err) {
                console.error(err)
                console.log('\x1b[31m', 'Invalid input, returning to main menu!');
                console.log('\n-------------\n');
                mainMenuPrompt();
            }
        });
}

function addEngineer(member) {
    return inquirer
        .prompt(roleQuestions[1])
        .then(response => {
            let name = member[0].trim();
            let id = member[1];
            let email = member[2].trim();
            let github = response.github;
            try {
                engineerData.push(new Engineer(name, id, email, github));
                teamData = [managerData, engineerData, internData];
                console.log('\x1b[32m', `Engineer ${name} added, returning to main menu!`);
                console.log('\n-------------\n');
                mainMenuPrompt();
            } catch (err) {
                console.error(err)
                console.log('\x1b[31m', 'Invalid input, returning to main menu!');
                console.log('\n-------------\n');
                mainMenuPrompt();
            }
        });
}

function addIntern(member) {
    return inquirer
        .prompt(roleQuestions[2])
        .then(response => {
            const name = member[0].trim();
            const id = member[1];
            const email = member[2].trim();
            const school = response.school;
            try {
                internData.push(new Intern(name, id, email, school));
                teamData = [managerData, engineerData, internData];
                console.log('\x1b[32m', `Intern ${name} added, returning to main menu!`);
                console.log('\n-------------\n');
                mainMenuPrompt();
            } catch (err) {
                console.error(err)
                console.log('\x1b[31m', 'Invalid input, returning to main menu!');
                console.log('\n-------------\n');
                mainMenuPrompt();
            }
        });
}

function removeRole() {
    return inquirer
        .prompt([
            {
                type: 'list',
                message: "Which position would you like to remove?",
                name: 'roleRemove',
                choices: ['manager', 'engineer', 'intern', 'Return']
            },
        ])
        .then(response => {
            switch (response.roleRemove) {
                case 'Return':
                    console.log('\n-------------\n');
                    mainMenuPrompt();
                    break;
                default:
                    console.log(response.roleRemove);
                    removeTeam(response.roleRemove);
            }
        });
}

function removeTeam(role) {
    let currentData = eval(role + 'Data');
    if (!currentData.length) {
        console.log('\x1b[31m', 'No team members currently in that role, returning to main menu.');
        console.log('\n-------------\n');
        mainMenuPrompt();
        return
    }
    return inquirer
        .prompt([
            {
                type: 'list',
                message: "Which team member would you like to remove?",
                name: 'teamRemove',
                choices: [...currentData, 'Return']
            }
        ])
        .then(response => {
            switch (response.teamRemove) {
                case 'Return':
                    console.log('\n-------------\n');
                    mainMenuPrompt();
                    break;
                default:
                    let selectedIndex = currentData.findIndex(employee => employee.name === response.teamRemove)
                    console.log(selectedIndex);
                    currentData.splice(selectedIndex, 1);
                    teamData = [managerData, engineerData, internData];
                    console.log(`Removed ${response.teamRemove} from team.`);
                    console.log('\n-------------\n');
                    mainMenuPrompt();
                    break;
            }
        });
}

function clearTeam() {
    teamData = [];
    console.log(`Cleared saved team!`);
    console.log('\n-------------\n');
    mainMenuPrompt();
}

// Function call to initialize app
mainMenuPrompt();