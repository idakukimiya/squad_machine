const Employee = require("../lib/Employee");
const Intern = require("../lib/Intern.js");

describe('Intern Class Init', () => {
    it('should create an object with a name, id, and email, and school given valid arguments', () => {
        const intern = new Intern('Rain',5,'example@email.edu','Penn University');

        expect(intern.name).toEqual('Rain');
        expect(intern.id).toEqual(5);
        expect(intern.email).toEqual('example@email.edu');
        expect(intern.school).toEqual('Penn University');
    })

    it('should create an object that is an instance of Employee', () => {
        const intern = new Intern('Rain',5,'example@email.edu','Penn University');

        expect(intern).toBeInstanceOf(Employee);
    })

    it('should throw an error if provided a school that is not a string',  () => {
        const intern = () => new Intern('Rain',5,'example@email.edu',0);

        expect(intern).toThrow();
    })

    it('should throw an error if provided no school',  () => {
        const intern = () => new Intern('Randy',5,'example@email.edu',);

        expect(intern).toThrow();
    })
})

describe('getRole Method', () => {
    it("should return 'Intern' when called",  () => {
        const intern = new Intern('Rain',5,'example@email.edu','Penn University');

        expect(intern.getRole()).toEqual('Intern');
    })
})

describe('getSchool Method', () => {
    it("should return the value of school when called",  () => {
        const intern = new Intern('Rain',5,'example@email.edu','Penn University');

        expect(intern.getSchool()).toEqual('Penn University');
    })
})