const Engineer = require("../lib/Engineer");

test("Can create a github.", () => {
    const testGithub = "SammyLinks";
    const employeeInstance = new Engineer("SammyLinks", 2, "sammylinks@gmail.com", testGithub);
    expect(employeeInstance.github).toBe(testGithub);
});

test("Testing getGithub will return github.", () => {
    const testGithub = "SammyLinks";
    const employeeInstance = new Engineer("Sammy", 2, "sammylinks@gmail.com", testGithub);
    expect(employeeInstance.getGithub()).toBe(testGithub);
});

test("Testing role.", () => {
    const returnValue = "Engineer";
    const employeeInstance = new Engineer("Sammy", 2, "sammylinks@gmail.com", "JamesLJenks");
    expect(employeeInstance.getRole()).toBe(returnValue);
});