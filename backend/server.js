const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
// const qs = require('querystring');
port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "64107899",
  database: "final_itd62_276",
});

db.connect((err) => {
  if (err) {
    err;
  }
  console.log("MySQL connection");
});

app.get("/", (req, res) => {
  res.send("Hello Final");
});

app.post("/getEmpData", (req, res) => {
  let message = "";
  let results = "";
  // let role = "Admin";
  const { Username, Password } = req.body;
  console.log("getEmpData", req.body);
  if (!Username || !Password) {
    message = "Username or Password not present";
    res
      .status(400)
      .send({ status: 400, error: false, data: results, msg: message });
  } else {
    db.query(
      "SELECT * FROM user_login WHERE Username = ? and Password = ? and Activeflag = 1",
      [Username, Password],
      function (err, results) {
        if (err) console.log(err);
        if (results.length == 0 || results === undefined) {
          message = "Username or Password is wrong";
          res
            .status(400)
            .send({ status: 400, error: false, data: results, msg: message });
        } else {
          const authority = results[0].Authority
          const role = results[0].Username
          if (authority == 1 || authority == 2) {
            db.query("SELECT * FROM employee", (error, results, fields) => {
              if (error) console.log(error);
              // if (authority == 2) {role == 'User'}
              if (results.length == 0 || results === undefined)
                message = "Table employee is emty !";
              else {
                message = "Get employee succesfuly.";
                res
                  .status(200)
                  .send({
                    status: 200,
                    error: false,
                    data: results,
                    msg: message,
                    role: role
                  });
              }
            });
          }
        }
      }
    );
  }
});

app.get("/userData", (req,res)=>{
 
  db.query("SELECT * FROM user_login",(error, results, fields) =>{
    const role = results[0].Username
    if (error) throw error
    if (results.length == 0 || results === undefined)
        message = "Table user_login is emty !"
    else
        message = "Get user_login succesfuly.";
    res.status(200).send({status:200, error: false, data: results, msg: message, role:role})
  })
})

app.post("/postEmpData", (req, res) => {
  let message = "";
  const { EmpName, EmpLastname, EmpAge, EmpAddress, EmpSalary, EmpPosition } =
    req.body;
  const { Username, Password } = req.body;
  console.log("post", req.body);
  if (!Username || !Password) {
    message = "Username or Password not present";
    res
      .status(400)
      .send({ status: 400, error: true, data: null, msg: message });
  } else {
    db.query(
      "SELECT * FROM user_login WHERE Username = ? and Password = ? and Activeflag = 1",
      [Username, Password],
      function (err, results) {
        if (err) {
          console.log(err);
          res
            .status(500)
            .send({ error: true, data: null, msg: "Database error" });
        } else if (results.length == 0 || results === undefined) {
          message = "Username or Password or Authority is wrong";
          res
            .status(400)
            .send({ status: 400, error: true, data: null, msg: message });
        } else {
          const authority = results[0].Authority;
          if (authority == 1) {
            if (
              EmpName == "" ||
              EmpLastname == "" ||
              EmpAge == "" ||
              EmpAddress == "" ||
              EmpSalary == "" ||
              EmpPosition == ""
            ) {
              message = "Some part of employee data not present";
              res
                .status(400)
                .send({ status: 400, error: true, data: null, msg: message });
            } else {
              db.query(
                "INSERT INTO employee (EmpID, EmpName, EmpLastname, EmpAge, EmpAddress, EmpSalary, EmpPosition ,Activeflag) VALUES (?,?,?,?,?,?,?,?)",
                [
                  null,
                  EmpName,
                  EmpLastname,
                  EmpAge,
                  EmpAddress,
                  EmpSalary,
                  EmpPosition,
                  1,
                ],
                function (err, result) {
                  if (err) {
                    console.log(err);
                    res
                      .status(500)
                      .send({
                        status: 500,
                        error: true,
                        data: null,
                        msg: "Database error",
                      });
                  } else if (result) {
                    message = "Inserted";
                    res
                      .status(200)
                      .send({
                        status: 200,
                        error: false,
                        data: result,
                        msg: message,
                      });
                  } else {
                    message = "Cannot insert";
                    res
                      .status(400)
                      .send({
                        status: 400,
                        error: true,
                        data: null,
                        msg: message,
                      });
                  }
                }
              );
            }
          } else {
            message = "User does not have permission to create employee";
            res
              .status(400)
              .send({ status: 400, error: true, data: null, msg: message });
          }
        }
      }
    );
  }
});

// (error, result, fields) => {
//   if (error)
//     console.log(error);
//   if (results.length == 0 || results === undefined)
//     message = "Table users is empty !";
//   else {
//     message = "Post data succesfuly.";
//     res.status(200).send({
//       status: 200, error: false, data: results, msg: message
//     })
//   }
// })
// } else {
//   message = "User not have permistion to create data";
//   res.status(400).send({ status: 400, error: false, data: {}, msg: message })
// }

//   db.query("INSERT INTO employee (EmpName, EmpLastname, EmpAge, EmpAdress, EmpSalary, EmpPosition) VALUES (?,?,?,?,?,?)",
//     [
//       object.EmpName,
//       object.EmpLastname,
//       object.EmpAge,
//       object.EmpAdress,
//       object.EmpSalary,
//       object.EmpPosition
//     ],
//     function (err, result) {
//       let message;
//       if (err) {
//         console.log(err);
//         message = "Post Data Error";
//         res.status(500).send({ error: true, data: null, msg: message });
//       } else {
//         message = "Post Data Successfully";
//         res.status(200).send({ error: false, data: result, msg: message });
//       }
//     })
// })

app.delete("/deleteEmpData/:EmpID", (req, res) => {
  let message = "";
  const { Username, Password } = req.body;
  console.log("delete", req.body);
  if (!Username || !Password) {
    message = "Username or Password not present";
    res
      .status(400)
      .send({ status: 400, error: true, data: null, msg: message });
  } else {
    db.query(
      "SELECT * FROM user_login WHERE Username = ? and Password = ? and Activeflag = 1",
      [Username, Password],
      function (err, results) {
        if (err) {
          console.log(err);
          res
            .status(500)
            .send({ error: true, data: null, msg: "Database error" });
        } else if (results.length == 0 || results === undefined) {
          message = "Username or Password or Authority is wrong";
          res
            .status(400)
            .send({ status: 400, error: true, data: null, msg: message });
        } else {
          const authority = results[0].Authority;
          if (authority == 1) {
            db.query(
              "DELETE FROM employee WHERE EmpID = ?",
              [req.params.EmpID],
              function (err, results) {
                if (err) {
                  console.log(err);
                  res
                    .status(500)
                    .send({
                      status: 500,
                      error: true,
                      data: null,
                      msg: "Database error",
                    });
                } else if (results) {
                  message = "Delete";
                  res
                    .status(200)
                    .send({
                      status: 200,
                      error: false,
                      data: results,
                      msg: message,
                    });
                } else {
                  message = "Cannot delete";
                  res
                    .status(400)
                    .send({
                      status: 400,
                      error: true,
                      data: null,
                      msg: message,
                    });
                }
              }
            );
          } else {
            message = "User does not have permission to create employee";
            res
              .status(400)
              .send({ status: 400, error: true, data: null, msg: message });
          }
        }
      }
    );
  }
});

app.post("/showEmpData/:EmpID", (req, res) => {
  let message = "";
  let results = "";
  const { Username, Password } = req.body;
  console.log("showEmp", req.body);
  if (!Username || !Password) {
    message = "Username or Password not present";
    res
      .status(400)
      .send({ status: 400, error: false, data: results, msg: message });
  } else {
    db.query(
      "SELECT * FROM user_login WHERE Username = ? and Password = ? and ActiveFlag = 1",
      [Username, Password],
      function (err, results) {
        if (err) console.log(err);
        if (results.length == 0 || results === undefined) {
          message = "Username or Password is wrong";
          res
            .status(400)
            .send({ status: 400, error: false, data: results, msg: message });
        } else {
          const authority = results[0].Authority;
          if (authority == 1) {
            db.query(
              "SELECT * FROM employee WHERE EmpID = ?",
              [req.params.EmpID],
              function (err, results) {
                if (err) {
                  console.log(err);
                  message = "Something went wrong";
                  res.status(500).send({ status: 500, error: true, data: null, msg: message });
                } else if (results.length == 0 || results === undefined) {
                  message = "Not have user";
                  res.status(404).send({ status: 404, error: false, data: null, msg: message });
                } else {
                  message = "Selected";
                  res.status(200).send({ status: 200, error: false, data: results, msg: message });
                }
              }
            );
          } else {
            message = "User does not have permission to create employee";
            res.status(403).send({ status: 403, error: true, data: null, msg: message });
          }

        }
      }
    );
  }
});

// app.get('/showEmpData/:EmpID', (req, res) => {
//   db.query("SELECT * FROM employee WHERE EmpID = ?", [req.params.EmpID],
//     function (err, result) {
//       let message;
//       if (err) {
//         console.log(err);
//         message = `Show Data ${req.params.EmpID} Error`;
//         res.status(500).send({ error: true, data: null, msg: message });
//       } else {
//         message = `Show Data ${req.params.EmpID} Successfully`;
//         res.status(200).send({ error: false, data: result, msg: message });
//       }
//     })
// })

app.put("/putEmpData/:EmpID", (req, res) => {
  const data = req.body;
  const id = req.params.EmpID;
  const { EmpName, EmpLastname, EmpAge, EmpAddress, EmpSalary, EmpPosition } =
    data;

  db.query(
    "UPDATE employee SET EmpName = ?, EmpLastname = ?, EmpAge = ?, EmpAddress = ?, EmpSalary = ?, EmpPosition = ? WHERE EmpID = ?",
    [EmpName, EmpLastname, EmpAge, EmpAddress, EmpSalary, EmpPosition, id],
    function (err, results) {
      let message;
      if (err) {
        console.log(err);
        message = `Put Data ${req.params.EmpID} Error`;
        res.status(500).send({ status: 500, error: true, data: null, msg: message });
      } else {
        message = `Put Data ${req.params.EmpID} Successfully`;
        res.status(200).send({ status: 200, error: false, data: results, msg: message });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
