const Manager = require('../lib/Manager');

describe('Manager', () => {
    it("should return the manager's name, ID, email, and office number", () => {
        const employeeStr = new Manager('Yoshi', 4, 'Dino_Yoshi@gmail.com', 5);

        expect(employeeStr.name).toEqual('Yoshi');
        expect(employeeStr.ID).toEqual(4);
        expect(employeeStr.email).toEqual('Dino_Yoshi@gmail.com');
        expect(employeeStr.officeNumber).toEqual(5);
    });
    
    describe('getRole', () => {
        it('should return a string of Manager', () => {
            const employeeStr = new Manager().getRole();

            expect(employeeStr).toEqual('Manager');
        });
    });

    describe('getOfficeNumber', () => {
        it("should return the Manager's office number", () => {
            const employeeStr = new Manager('Yoshi', 4, 'Dino_Yoshi@gmail.com', 5);

            expect(employeeStr.getOfficeNumber()).toEqual(5);
        });
    });
});