const express = require('express');
const app = express();
const fs = require('fs');
const volley = require('volleyball');
const nuns = require('nunjucks');
const routes = require('./routes');

// let sleddingNuns = nuns.render('index.html', locals, function (err, output){
//   console.log(output);
// });

app.set('view engine', 'html');
app.engine('html', nuns.render);
nuns.configure('views', {noCache: true});

app.use('/', routes);
app.use(volley);

app.use(function(req, res, next){
  console.log(req.method, req.url, res.statusCode);
  next();
});

app.use('/special\*', function(req, res, next){
  console.log("This is the special area!");
  next();
});

app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('body-parser').json());
app.use(express.static('public'));


app.listen(3000);

