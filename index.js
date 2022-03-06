// todo: require

// inquirer
const inquirer = require("inquirer");
// mysql2
const mysql = require("mysql2");
// console.table
const cTable = require("console.table");
// database connection

const db = mysql.createConnection(
  // access to database
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employee-tracker-db",
  },
  console.log("connected to database: employee-tracker-db")
);

// error handling
db.connect((err) => {
  if (err) throw err;
});

// menu
const menu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add Employee",
            "Add Role",
            "Update Employee Role",
            "Delete Employee",
            "View All Departments",
            "Add Department",
            "Delete Department",
            "Exit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.menu) {
        
        // *view
        // view-all-employees
        case "View All Employees":
              viewAllEmployees();
                  db.query(   // query to database
                      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;",
                      (err, res) => {
                            if (err) throw err;
                            console.table(res);
                            menu();
                      }
                  );
              }
              break;
        // view-all-employees-by-department
        case "View All Employees By Department";
              viewAllEmployeesByDepartment();
                  db.query(   // query to database
                      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;",
                      (err, res) => {
                            if (err) throw err;
                            console.table(res);
                            menu();
                      }
                  );

              break;
        // view-employees-by-manager
        case "View All Employees By Manager";
              viewAllEmployeesByManager()
                  db.query(   // query to database
                      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;",
                      (err, res) => {
                            if (err) throw err;
                            console.table(res);
                            menu();
                      }
                  );
              break;
        // view-all-roles
        case "View All Roles";
              viewAllRoles()
                  db.query(   // query to database
                      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;",
                      (err, res) => {
                          if (err) throw err;
                          console.table(res);
                          menu();
                      }
                  );
              }
              break;
        // view-all-departments
        
        // *add
        // add-employee
        case "Add Employee":
              addEmployee(){
                  return inquirer.prompt([
                      {
                          type: "input",
                          message: "What is the employee's first name?",
                          name: "first_name",
                      },
                      {
                          type: "input",
                          message: "What is the employee's last name?",
                          name: "last_name",
                      },
                      {
                          type: "input",
                          message: "What is the employee's role id?",
                          name: "role_id",
                      },
                      {
                          type: "input",
                          message: "What is the employee's manager id?",
                          name: "manager_id",
                      },
                  ]).then((answers) => {
                      db.query(
                          "INSERT INTO employee SET ?",
                          {
                              first_name: answers.first_name,
                              last_name: answers.last_name,
                              role_id: answers.role_id,
                              manager_id: answers.manager_id,
                          },
                          (err, res) => {
                              if (err) throw err;
                              console.log(
                                  `${answers.first_name} ${answers.last_name} added to the database!`
                              );
                              menu();
                          }
                      );
                  });
              }
              break;
              // add role
        case "Add Role":
              addRole(){
                  return inquirer.prompt([
                      {
                          type: "input",
                          message: "What is the role title?",
                          name: "title",
                      },
                      {
                          type: "input",
                          message: "What is the role salary?",
                          name: "salary",
                      },
                      {
                          type: "input",
                          message: "What is the role department id?",
                          name: "department_id",
                      },
                  ]).then((answers) => {
                        db.query(
                            "INSERT INTO role SET ?",
                            {
                                title: answers.title,
                                salary: answers.salary,
                                department_id: answers.department_id,
                            },
                            (err, res) => {
                                if (err) throw err;
                                console.log(
                                    `${answers.title} added to the database!`
                                );
                                menu();
                            }
                        );
                  });       
            }
        
        // *update
        // update-employee-role
        case "Update Employee Role":
              updateEmployeeRole(){
                  return inquirer.prompt([
                      {
                          type: "input",
                          message: "What is the employee's id?",
                          name: "id",
                      },
                      {
                          type: "input",
                          message: "What is the employee's /NEW/ role id?",
                          name: "role_id",
                      },
                  ]).then((answers) => {
                        db.query(
                            "UPDATE employee SET ? WHERE ?",
                            [
                                {
                                    role_id: answers.role_id,
                                },
                                {
                                    id: answers.id,
                                },
                            ],
                            (err, res) => {
                                if (err) throw err;
                                console.log(
                                    `${answers.id}'s role has been updated!`
                                );
                                menu();
                            }
                        );
                  }
                  );
              }
              break;
        // *delete
        // delete-employee
        case "Delete Employee":
              deleteEmployee(){
                  return inquirer.prompt([
                      {
                          type: "input",
                          message: "What is the employee's id?",
                          name: "id",
                      },
                  ]).then((answers) => {
                        db.query(
                            "DELETE FROM employee WHERE ?",
                            {
                                id: answers.id,
                            },
                            (err, res) => {
                                if (err) throw err;
                                console.log(
                                    `${answers.id} has been deleted!`
                                );
                                menu();
                            }
                        );
                  }
                  );
              }
              break;
        // delete-role
          case "Delete Role":
              deleteRole(){
                  return inquirer.prompt([
                      {
                          type: "input",
                          message: "What is the role id?",
                          name: "id",
                      },
                  ]).then((answers) => {
                        db.query(
                            "DELETE FROM role WHERE ?",
                            {
                                id: answers.id,
                            },
                            (err, res) => {
                                if (err) throw err;
                                console.log(
                                    `${answers.id} has been deleted!`
                                );
                                menu();
                            }
                        );
                  }
                  );
              }
              break;
        // quit
          case "Quit":
              quit(){
                  console.log("Goodbye!");
                  process.exit();
              }
              break;
          default:
              console.log("Please enter a valid command.");
              menu();
              break;
      }
    });
}



        // *roles
          viewAllRoles();
              break;
          
        

        // *department
        // view-all-departments
        case "View All Employees By Department":
          viewAllEmployeesByDepartment();
          break;
        // add department
        case "Add Department":
          addDepartment();
          break;
        // delete
        case "Delete Department":
          deleteDepartment();
          break;

        case "View All Employees By Manager":
          viewAllEmployeesByManager();
          break;
        case "Add Employee":
          addEmployee();
          break;
        // show departments
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Exit":
          db.end();
          break;
      }
    });
};

function 

// *bonus*
// update manager

// *bonus*
// delete employee

// *bonus*
// delete department

// *bonus*
// delete role

// *bonus*
// view employee by department

// *bonus*
// view aggregate budget by department
