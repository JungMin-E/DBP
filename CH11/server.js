const express = require('express');
var mysql = require("mysql2");

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "myboard"
});

conn.connect((err) => {
    if (err) {
        console.error('Error', err);
        return;
    }
});

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.listen(8080, function () {
    console.log("포트 8080으로 서버 대기중 ...");
});

app.get("/list", function (req, res) {
    const sql = "SELECT * FROM post";
    conn.query(sql, (err, results) => {
        if (err) {
            console.error('Error', err);
            res.status(500).send("Error fetching data!");
            return;
        }
        console.log(results);
        res.render('list.ejs', { data: results });
    });
});

app.get('/enter', function (req, res) {
    res.sendFile(__dirname + '/enter.html');
});

/*
app.post('/save', function (req, res) {
    const { title, content, date } = req.body;
    const sql = "INSERT INTO post (title, content, date) VALUES (?, ?, ?)";
    conn.query(sql, [title, content, date], function (err, result) {
        if (err) {
            console.error('Error', err);
            res.status(500).send("Error!");
            return;
        }
        console.log("Data saved successfully:", result);
        res.send("Data saved successfully!");
    });
});
*/
app.post('/save', function (req, res) {
  const { title, content, date } = req.body;
  const sql = "INSERT INTO post (title, content, date) VALUES (?, ?, ?)";
  conn.query(sql, [title, content, date], function (err, result) {
      if (err) {
          console.error('Error', err);
          res.status(500).send("Error!");
          return;
      }
      console.log("Data saved successfully:", result);
      res.redirect('/list');
  });
});
