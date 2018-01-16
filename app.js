const express = require('express');
const app = express();
const fs = require('fs');
const volley = require('volleyball');
app.use(volley);

app.use(function(req, res, next){
  console.log(req.method, req.url, res.statusCode);
  next();
});

app.use('/special\*', function(req, res, next){
  console.log("This is the special area!");
  next();
})

app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('body-parser').json())

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/news', (req, res) => res.send('This is the news, it is hilarious'));

app.get('/modernism', function(req, res, next){
  //res.send('You have understood the concept of modernism');
  next();
}, function(req, res){
  res.send('Hi there, what is your name? <form method=post><input name=username><input type=submit></form>');
});



app.post('/modernism', function(req, res){
  fs.writeFile('./data', JSON.stringify(req.body), () => res.send(req.body));

});

app.listen(3000);

