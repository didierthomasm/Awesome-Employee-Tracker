INSERT INTO department (name) VALUES
    ('Brewing Department'),
    ('Quality Control Department'),
    ('Marketing Department');

INSERT INTO role (title, salary, department_id) VALUES
    ('Brewmaster', 80000.00, 1),
    ('Brewer', 60000.00, 1),
    ('Quality Control Manager', 75000.00, 2),
    ('Quality Control Technician', 55000.00, 2),
    ('Marketing Manager', 70000.00, 3),
    ('Marketing Coordinator', 50000.00, 3),
    ('Sales Manager', 75000.00, 3),
    ('Sales Representative', 60000.00, 3),
    ('Warehouse Manager', 65000.00, 1),
    ('Warehouse Associate', 45000.00, 1),
    ('Finance Manager', 80000.00, 3),
    ('Accountant', 55000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Michael', 'Johnson', 3, 1),
    ('Emily', 'Williams', 4, 2),
    ('Robert', 'Brown', 5, 2),
    ('Sarah', 'Jones', 6, 3),
    ('David', 'Miller', 7, 3),
    ('Jessica', 'Davis', 8, 4),
    ('Christopher', 'Taylor', 9, 4),
    ('Laura', 'Anderson', 10, 5),
    ('Matthew', 'Martinez', 11, 5),
    ('Amanda', 'Thomas', 12, 6),
    ('Andrew', 'Wilson', 1, 7),
    ('Olivia', 'Jackson', 2, 7),
    ('Daniel', 'White', 3, 8),
    ('Sophia', 'Lopez', 4, 8),
    ('William', 'Hall', 5, 9),
    ('Isabella', 'Young', 6, 9),
    ('Ethan', 'Harris', 7, 10),
    ('Mia', 'Lewis', 8, 10),
    ('Alex', 'Martin', 9, 11),
    ('Emma', 'Clark', 10, 11);