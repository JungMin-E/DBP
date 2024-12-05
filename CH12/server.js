const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const objId = require('mongodb').ObjectId;
const mysql = require('mysql2');

var conn;
const url = 'mongodb+srv://ljm9990:1234@cluster0.1ip8q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoClient.connect(url)
.then(client => {
    console.log('몽고DB 접속 성공');
    conn = client.db('myboard');
})

const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json()); // JSON 형식 파싱
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 형식 파싱
app.set('view engine', 'ejs');

app.listen(8080, ()=>{
    console.log('포트 8080으로 서버 대기 중...')
  });
  
app.get('/enter', (req,res)=> {
    // res.sendFile(__dirname + '/enter.html');
    res.render(__dirname+'/views/enter.ejs');
});

app.get('/list', async (req,res)=> {
    const result = await conn.collection('post').find().toArray().then(result=>{
        // console.log(result);
        res.render(__dirname + '/views/list.ejs', {data : result});
    });
});

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