const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "student_db",
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// CRUD endpoints

app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

app.post("/students", (req, res) => {
  const { name, email, course } = req.body;
  db.query(
    "INSERT INTO students (name, email, course) VALUES (?, ?, ?)",
    [name, email, course],
    (err, result) => {
      if (err) return res.send(err);
      res.send("Student added");
    }
  );
});

app.put("/students/:id", (req, res) => {
  const { name, email, course } = req.body;
  db.query(
    "UPDATE students SET name = ?, email = ?, course = ? WHERE id = ?",
    [name, email, course, req.params.id],
    (err, result) => {
      if (err) return res.send(err);
      res.send("Student updated");
    }
  );
});

app.delete("/students/:id", (req, res) => {
  db.query(
    "DELETE FROM students WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.send(err);
      res.send("Student deleted");
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
