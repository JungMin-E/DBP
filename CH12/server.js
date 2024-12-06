const express = require('express');
const mysql = require('mysql2');
const mongoClient = require('mongodb').MongoClient;
const objId = require('mongodb').ObjectId;

const app = express();
const bodyParser = require('body-parser');

//mongodb 접속
/*
var conn;
const url = 'mongodb+srv://ljm9990:1234@cluster0.1ip8q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoClient.connect(url)
.then(client => {
    console.log('몽고DB 접속 성공');
    conn = client.db('myboard');
})
*/

//mysql접속
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "myboard",
    timezone: '+09:00'
});

conn.connect((err) => {
    if (err) {
        console.error('mysql에 연결 오류!', err);
        return;
    }
    console.log('mysql에 연결');
});

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json()); // JSON 형식 파싱
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 형식 파싱
app.set('view engine', 'ejs');

app.listen(8080, ()=>{
    console.log('포트 8080으로 서버 대기 중...')
  });

//mongodb /enter
/*
app.get('/enter', (req,res)=> {
    // res.sendFile(__dirname + '/enter.html');
    res.render(__dirname+'/views/enter.ejs');
});
*/
//mysql /enter
app.get('/enter', (req, res) => {
    res.render(__dirname + '/views/enter.ejs');
});

//mongodb /list
/*
app.get('/list', async (req,res)=> {
    const result = await conn.collection('post').find().toArray().then(result=>{
        // console.log(result);
        res.render(__dirname + '/views/list.ejs', {data : result});
    });
});
*/
//mysql /list
app.get('/list', (req, res) => {
    const sql = "SELECT * FROM POST";
    conn.query(sql, (err, results) => {
        if(err) {
            console.error('Error', err);
            res.status(500).send("list 불어오기 오류!");
            return;
        }
        //console.log(results);
        res.render(__dirname + '/views/list.ejs', {data: results});
    });
});

//mongodb /submit
/*
app.post('/submit', (req,res)=> {
    conn.collection('post').insertOne({
        title:req.body.title, 
        content:req.body.content, 
        date:req.body.someDate,
    }).then(result=>{
        console.log(result);
        res.send('데이터 저장 완료');
    })
})
*/
//mysql /submit
app.post('/submit', (req, res) => {
    const {title, content} = req.body;
    const sql = "INSERT INTO post (title, content, date) VALUES (?, ?, NOW())";
    const values = [title, content];

    conn.query(sql, values, (err, results) => {
        if(err) {
            console.err('데이터 저장 오류!', err);
            res.status(500).send('Error');
            return;
        }
        console.log('저장된 데이터: ', results);
        res.send('데이터 저장 완료!');
    });
});
/*
//mongodb /delete
app.post('/delete', (req,res)=>{
    console.log(req.body);
    req.body._id = new objId(req.body._id);
    conn.collection('post').deleteOne(req.body)
    .then(result=>{
        res.status(200).send();
        console.log('삭제완료');
    })
    .catch(err => {
        console.log(err);
        res.status(500).send();
    })
});
*/
//mysql /delete
app.post('/delete', (req, res) => {
    const { id } = req.body; //클라이언트에게 id를 전달받음
    
    const sql = "DELETE FROM post WHERE id = ?";

    conn.query(sql, [id], (err, results) => {
        if(err) {
            console.error('데이터 삭제 오류!', err);
            res.status(500).send('데이터 삭제중 오류 발생!');
            return;
        }
        res.send('삭제완료!');
    });
});