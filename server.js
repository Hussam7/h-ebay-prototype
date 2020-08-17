var express = require('express');
const session = require('express-session');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const path = require("path");
var app = express();
var sess; //sess = req.session;
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect("mongodb://localhost:27017/", {
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('ebay-db')
    const bidHistoryCollection = db.collection('bidHistory')

})//end db
     
app.post('/login', (req, res) => {
    sess = req.session;
    //sess.username1 =  req.body.username; 
    console.log('running index... ') 
    console.log(req.body.username)  
    
    res.render('index.ejs', { username: req.body.username})
 })
    //index
app.get('/', (req, res) => {
    console.log('running login... ')    
    res.render('login.ejs', {})
 })
  //end index

  app.listen(3000, () => {
    console.log('listening on :3000');
  });