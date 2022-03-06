-- todo: seed data for departments, roles, employees

-- *seed data for department
-- sales
-- engineering
-- finance
-- legal
    -- id
    -- name
INSERT INTO departments (id, name)
VALUES
    (1, "sales"),
    (2, "engineering"),
    (3, "finance"),
    (4, "legal");

-- *seed data for roles
-- title
-- salary
-- department_id
    -- 1 salesperson
    -- 2 engineer
    -- 3 accountant
    -- 4 lawyer
INSERT INTO roles (title, salary, department_id)
VALUES
    ("salesperson", 50000, 1),
    ("engineer", 60000, 2),
    ("accountant", 40000, 3),
    ("lawyer", 80000, 4);

-- *seed data for employees
-- first_name
-- last_name
-- role_id
-- manager_id
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", 1, NULL),
    ("Jane", "Doe", 2, NULL),
    ("Joe", "Doe", 3, NULL),
    ("Jill", "Doe", 4, NULL),
    ("John", "Smith", 1, 1),
    ("Jane", "Smith", 2, 1),
    ("Joe", "Smith", 3, 1),
    ("Jill", "Smith", 4, 1),
    ("John", "Williams", 1, 2),
    ("Jane", "Williams", 2, 2),
    ("Joe", "Williams", 3, 2),
    ("Jill", "Williams", 4, 2),
    ("John", "Jones", 1, 3),
    ("Jane", "Jones", 2, 3),
    ("Joe", "Jones", 3, 3),
    ("Jill", "Jones", 4, 3),
    ("John", "Brown", 1, 4),
    ("Jane", "Brown", 2, 4),
    ("Joe", "Brown", 3, 4),
    ("Jill", "Brown", 4, 4);

