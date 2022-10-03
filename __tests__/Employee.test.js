const Employee = require('../lib/Employee');

describe('Employee', () => {
    it("should return the employee's name, ID, and email", () => {
        const employeeStr = new Employee('Sarah', 4, 'sarahlim78@gmail.com');

        expect(employeeStr.name).toEqual('Sarah');
        expect(employeeStr.ID).toEqual(4);
        expect(employeeStr.email).toEqual('sarahlim78@gmail.com');
    });
    
    describe('getRole', () => {
        it('should return a string of Employee', () => {
            const employeeStr = new Employee().getRole();

            expect(employeeStr).toEqual('Employee');
        });
    });

    describe('getName', () => {
        it('should return the name of the employee', () => {
            const employeeStr = new Employee('Josh');

            expect(employeeStr.getName()).toEqual('Josh');
        });
    });
});
