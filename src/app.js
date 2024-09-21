const express = require("express");
const cors = require("cors");
const app = express();
const mysql2 = require("mysql2");

const server = app.listen(3000, function () {
  console.log("NOde.js is listening to PORT:" + server.address().port);
});

app.disable("x-powerd-by");
app.use(cors()).use(express.json());

const connection = mysql2.createConnection({
  host: "localhost",
  port: 3306,
  user: "user",
  password: "password",
  database: "sample",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected mysql");
});

app.get("/api/todos", (req, res) => {
  const sql = "select * from todos";
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.status(200).json(results);
  });
});

app.get("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const sql = "select * from todos where ?";
  connection.query(sql, { id: id }, (err, results) => {
    if (err) throw err;
    res.status(200).json(results[0]);
  });
});

app.post("/api/todos", (req, res) => {
  const todo = req.body;
  const sql = "insert into todos set ?";
  connection.query(sql, todo, (err, results) => {
    if (err) throw err;
    res.status(201).json(results.id);
  });
});


app.put("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const todo = req.body;
  const sql = `UPDATE todos SET title ='${todo.title}', description='${todo.description}' where id=${id}`;
  connection.query(sql, null, (err, results) => {
    if (err) throw err;
    res.status(200).send();
  });
});

app.delete("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM todos WHERE ?";
  connection.query(sql, { id: id }, (err, results) => {
    if (err) throw err;
    res.status(204).json(results[0]);
  });
});