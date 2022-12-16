//index.js
const dotenv = require('dotenv')
const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));
dotenv.config();
app.set('view engine', 'ejs');
let db;
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(`mongodb+srv://${process.env.MONGODB_USER_ID}:${process.env.MONGODB_USER_PW}@cluster0.pso4lve.mongodb.net/?retryWrites=true&w=majority`,
    function (err, client) {
        if (err) {
            return console.log(err)
        }
        db = client.db('todoApp');

        app.post('/add', function (req, res) {
            console.log(req.body);
            db.collection('post').insertOne({title: req.body.title, data: req.body.date}, function (err, result) {
                console.log('저장완료');
            });
            res.send('전송완료')
        });
    })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
app.get('/write', (req, res) => {
    res.sendFile(__dirname + '/write.html');
})
app.get('/list', (req, res) => {
    //모든데이터 가져오기 문법
    db.collection('post').find().toArray((err, result) => {
        console.log(result)
        res.render('list.ejs', {posts: result});
    });
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});