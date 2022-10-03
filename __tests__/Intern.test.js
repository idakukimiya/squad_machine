const Intern = require('../lib/Intern');

describe('Intern', () => {
    it("should return the intern's name, ID, email, and school", () => {
        const employeeStr = new Intern('Rain', 4, 'Rain_Walnut@gmail.com', 'UPenn');

        expect(employeeStr.name).toEqual('Rain');
        expect(employeeStr.ID).toEqual(4);
        expect(employeeStr.email).toEqual('Rain_Walnut@gmail.com');
        expect(employeeStr.school).toEqual('UPenn');
    });
    
    describe('getRole', () => {
        it('should return a string of Intern', () => {
            const employeeStr = new Intern().getRole();

            expect(employeeStr).toEqual('Intern');
        });
    });

    describe('getSchool', () => {
        it("should return the intern's school", () => {
            const employeeStr = new Intern('Rain', 4, 'Rain_Walnut@gmail.com', 'UPenn');

            expect(employeeStr.getSchool()).toEqual('UPenn');
        });
    });
});