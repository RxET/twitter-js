const express = require('express');
const app = express();
const fs = require('fs');
const volley = require('volleyball');
const nuns = require('nunjucks')

let people = [{name: 'Donny'}, {name: 'Gorka'}, {name: 'Vlad'}, {name: 'Jared'}]
let locals = {
  title: 'Fake News',
}

let sleddingNuns = nuns.render('index.html', locals, function (err, output){
  console.log(output);
});

app.set('view engine', 'html');
app.engine('html', nuns.render); 
nuns.configure('views', {noCache: true});

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

app.render('index', locals, function (err, html){
  app.get('/views/index.html', (req, res) => res.render('index', {title:'Fake News', people: people}));
})
// app.get('/views/index.html', (req, res) => res.render('index', {title: 'Fake news'}));

app.get('/news', (req, res) => res.send('This is the news, it is hilarious'));

app.get('/modernism', function(req, res, next){
  next();
}, function(req, res){
  res.send('Hi there, what is your name? <form method=post><input name=username><input type=submit></form>');
});



app.post('/modernism', function(req, res){
  fs.writeFile('./data', JSON.stringify(req.body), () => res.send(req.body));

});

app.listen(3000);

