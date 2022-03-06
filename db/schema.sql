-- todo: drop tables

-- todo: drop departments
DROP TABLE IF EXISTS departments;
-- todo: drop roles
DROP TABLE IF EXISTS roles;
-- todo: drop employess
DROP TABLE IF EXISTS employees;

-- *create table departments
-- sales
-- engineering
-- finance
-- legal
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- *create table roles
-- salesperson
-- engineer
-- accountant
-- lawyer
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary INTEGER NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- *create table employees
-- id
-- first_name
-- last_name
-- role_id
-- manager_id
-- foreign key (role_id) references roles (id)
    -- on delete set null
-- foreign key (manager_id) references employees (id)
    -- on delete set null
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);

