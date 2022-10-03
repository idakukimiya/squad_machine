const Employee = require('../lib/Employee');

describe('Employee Class Init', () => {
    it('should create an object with a name, id, and email given valid arguments', () => {
        const employee = new Employee('Ann',12,'example@email.com');

        expect(employee.name).toEqual('Ann');
        expect(employee.id).toEqual(12);
        expect(employee.email).toEqual('example@email.com');
    })
    
    it('should throw an error if provided no arguments',  () => {
        const badEmp =  () => new Employee();

        expect(badEmp).toThrow();
    })

    it('should throw an error if provided no name',  () => {
        const badEmp =  () => new Employee(12,'example@email.com');

        expect(badEmp).toThrow();
    })

    it('should throw an error if provided no id',  () => {
        const badEmp =  () => new Employee('Ann','example@email.com');

        expect(badEmp).toThrow();
    })

    it('should throw an error if provided no email',  () => {
        const badEmp =  () => new Employee('Ann',12);

        expect(badEmp).toThrow();
    })

    it('should throw an error if provided an email with bad formatting ',  () => {
        const badEmp =  () => new Employee('Ann',12,'bademail');

        expect(badEmp).toThrow();
    })
})

describe('getName Method', () => {
    it('should return the name when called',  () => {
        const employee = new Employee('Ann',12,'example@email.com');

        expect(employee.getName()).toEqual('Ann');
    })
})

describe('getId Method', () => {
    it('should return the id when called',  () => {
        const employee = new Employee('Ann',12,'example@email.com');

        expect(employee.getId()).toEqual(12);
    })
})

describe('getEmail Method', () => {
    it('should return the email when called',  () => {
        const employee = new Employee('Ann',12,'example@email.com');

        expect(employee.getEmail()).toEqual('example@email.com');
    })
})

describe('getRole Method', () => {
    it("should return 'Employee' when called",  () => {
        const employee = new Employee('Ann',12,'example@email.com');

        expect(employee.getRole()).toEqual('Employee');
    })
})
