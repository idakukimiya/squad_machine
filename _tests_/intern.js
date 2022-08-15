// My Attempt
const Intern = require("../lib/Intern");

test("Can create school.", () => {
    const testSchool = "School Name";
    const employeeInstance = new Intern("Sammy", 2, "sammylinks@gmail.com", testSchool);
    expect(employeeInstance.school).toBe(testSchool);
});

test("Testing officeNumber will return office number.", () => {
    const testSchool = "School Name";
    const employeeInstance = new Intern("Sammy", 2, "sammylinks@gmail.com", testSchool);
    expect(employeeInstance.getSchool()).toBe(testSchool);
});

test("Testing role.", () => {
    const returnValue = "Intern";
    const employeeInstance = new Intern("Sammy", 2, "sammylinks@gmail.com", "School Name");
    expect(employeeInstance.getRole()).toBe(returnValue);
});