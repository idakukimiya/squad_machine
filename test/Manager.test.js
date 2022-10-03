const Employee = require("../lib/Employee");
const Manager = require("../lib/Manager");

describe('Manager Class Init', () => {
    it('should create an object with a name, id, and email, and officeNumber given valid arguments', () => {
        const manager = new Manager('Yoshi',3,'example@email.gov',6);

        expect(manager.name).toEqual('Yoshi');
        expect(manager.id).toEqual(3);
        expect(manager.email).toEqual('example@email.gov');
        expect(manager.officeNumber).toEqual(6);
    })

    it('should create an object that is an instance of Employee', () => {
        const manager = new Manager('Yoshi',3,'example@email.gov',6);

        expect(manager).toBeInstanceOf(Employee);
    })

    it('should throw an error if provided no officeNum',  () => {
        const manager = () => new Manager('Yoshi',3,'example@email.gov');

        expect(manager).toThrow();
    })

    it('should throw an error if provided an officeNum that is not a number',  () => {
        const manager = () => new Manager('Yoshi',3,'example@email.gov','0');

        expect(manager).toThrow();
    })
})

describe('getRole Method', () => {
    it("should return 'Manager' when called",  () => {
        const manager = new Manager('Yoshi',3,'example@email.gov',6);

        expect(manager.getRole()).toEqual('Manager');
    })
})

describe('getOffice Method', () => {
    it("should return the office number when called",  () => {
        const manager = new Manager('Yoshi',3,'example@email.gov',6);

        expect(manager.getOffice()).toEqual(6);
    })
})