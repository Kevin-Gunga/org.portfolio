const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
// const cors = require("cors");
require("dotenv").config();
// const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: process.env.database_host,
  user: process.env.database_user,
  password: process.env.database_password
});

db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("connected to MysQl, ID: ", db.threadId);

  const portfolio = `CREATE DATABASE IF NOT EXISTS portfolio`;

  db.query(portfolio, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("portfolio database created successfully");

    db.changeUser({ database: "portfolio" }, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log("porfolio database is in use");

      const user = `CREATE TABLE IF NOT EXISTS user (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, message TEXT NOT NULL, submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIME)`;

      db.query(user, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log("user table created successfully");
      });
    });
  });
});

app.post("/", (req, res) => {
  const { name, email, message } = req.body;
  const query = `INSERT INTO user (name, email, message) VALUES (?, ?, ?)`;
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.log(err);
      // res.status(500).sendFile(path.join(__dirname, "500.html"));
    }
    console.log("information submitted successfully");
    return res.redirect('/');
  });
});

app.get("/index", (req, res) => {
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../404.html"));
});

app.use((error, req, res, next) => {
  res.status(500).sendFile(path.join(__dirname, "../500.html"));
});

app.listen(4000, () => {
  console.log("Server is up and running on port: 4000");
});
