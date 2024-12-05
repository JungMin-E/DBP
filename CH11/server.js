const express = require('express');
//var mysql = require("mysql2");
const mongoclient = require('mongodb').MongoClient;
var mydb;
const url = 'mongodb+srv://ljm9990:1234@cluster0.1ip8q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
//const url = 'mongodb+srv://ljm9990:1234@cluster0.1ip8q.mongodb.net/';
mongoclient.connect(url)
    .then(client => {
        console.log('몽고DB 접속 성공');
        mydb = client.db('myboard');
    })
    .catch(err => {
        console.error('몽고DB 접속 실패: ', err);
    });

/*
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
*/
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

app.post('/delete', (req, res) => {
    console.log(req.body);
    req.body._id = new ObjectId(req.body._id);
    mydb.collection('post').deleteOne(req.body).then(result => {
        console.log('삭제완료');
    });
});