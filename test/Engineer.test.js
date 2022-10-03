const Employee = require("../lib/Employee");
const Engineer = require("../lib/Engineer.js");

describe('Engineer Class Init', () => {
    it('should create an object with a name, id, and email, and github given valid arguments', () => {
        const engineer = new Engineer('Zen',7,'example@email.net','GenZ');

        expect(engineer.name).toEqual('Zen');
        expect(engineer.id).toEqual(7);
        expect(engineer.email).toEqual('example@email.net');
        expect(engineer.github).toEqual('GenZ');
    })

    it('should create an object that is an instance of Employee', () => {
        const engineer = new Engineer('Zen',7,'example@email.net','GenZ');

        expect(engineer).toBeInstanceOf(Employee);
    })

    it('should throw an error if provided a github that is not a string',  () => {
        const engineer = () => new Engineer('Zen',7,'example@email.net',0);

        expect(engineer).toThrow();
    })

    it('should throw an error if provided no github',  () => {
        const engineer = () => new Engineer('Zen',7,'example@email.net');

        expect(engineer).toThrow();
    })
})

describe('getRole Method', () => {
    it("should return 'Engineer' when called",  () => {
        const engineer = new Engineer('Zen',7,'example@email.net','GenZ');

        expect(engineer.getRole()).toEqual('Engineer');
    })
})

describe('getGithub Method', () => {
    it("should return the value of github when called",  () => {
        const engineer = new Engineer('Mike',7,'example@email.net','mikez');

        expect(engineer.getGithub()).toEqual('mikez');
    })
})
