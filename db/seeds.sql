INSERT INTO department (name)
VALUES ("Manager"), ("Engineering"), ("Finance"), ("Legal"), ("Intern");

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 100000, 1),
        ("Senior-Engineer", 125000, 2),
        ("Junior-Engineer", 100000, 2),
        ("Accountant", 120000, 3),
        ("Lawyer", 190000, 4),
        ("Intern",200000, 5);
        

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Fred", "Kamm", 1, NULL),
        ("Stacy", "Jones", 2, NULL),
        ("John", "Smith", 3, 2),
        ("Steph", "Curry", 4, 3),
        ("Rain", "Walnut", 5, null),
        ("Kate", "Soda", 5, 2);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;