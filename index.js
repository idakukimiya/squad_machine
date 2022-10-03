const inquirer = require('inquirer')
const template = require('./src/template')
const writeFile = require('./src/write-file')

const { Manager, managerQuestionsArr } = require('./lib/Manager');
const { Engineer, engineerQuestionsArr } = require('./lib/Engineer');
const { Intern, internQuestionsArr } = require('./lib/Intern');

const employeesArr = []

const init = () => { managerQuestions() }
// prompts manager questions then creates object from user inputs based on Manager class 
const managerQuestions = () => {
    inquirer.prompt(managerQuestionsArr)
    .then(( answers ) => {
        answers = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        employeesArr.push(answers);
        return employeePrompt();
    })
}

const engineerQuestions = () => {
    inquirer.prompt(engineerQuestionsArr)
    .then(( answers ) => {
        answers = new Engineer(answers.name, answers.id, answers.email, answers.github)
        employeesArr.push(answers);
        return employeePrompt();
    })
}

const internQuestions = () => {
    inquirer.prompt(internQuestionsArr)
    .then(( answers ) => {
        answers = new Intern(answers.name, answers.id, answers.email, answers.school)
        employeesArr.push(answers);
        return employeePrompt();
    })
}

const employeePrompt = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'employeeType',
        message: "What kind of team member would you like to add?",
        choices: [
            {name: 'Engineer', value: "addEngineer"},
            {name: 'Intern', value: "addIntern"},
            {name: 'DONE', value: "done"}
        ]
    }])
    .then( answer => {
        // sends correct prompts based on the employee type
        if (answer.employeeType === 'addEngineer') { engineerQuestions(); };
        if (answer.employeeType === 'addIntern') { internQuestions(); };
        if (answer.employeeType === 'done') {
            // converts users inputs into HTML
            let html = template(employeesArr)
            console.log('...');
            // creates HTML file
            writeFile(html);
        }
    })
}

init();