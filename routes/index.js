'use strict'

const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank');
const bodyparser = require('body-parser');

router.use(bodyparser.urlencoded({extended: true}));
router.use(bodyparser.json());
router.use(express.static('public'));



router.get('/', function(req, res){
  let tweets = tweetBank.list();
  res.render('index', {tweets : tweets, showForm: true},);
});

router.get('/users/:name', function(req, res, next){
  var name = req.params.name;
  let list = tweetBank.find({name: name});
  res.render('index', {tweets: list, showForm: true});
  next();
});

router.get('/tweets/:id', function(req, res, next){
  let id = parseInt(req.params.id);
  let list = tweetBank.find({id: id});
  res.render('index', {tweets: list, showForm: true});
  next();
});

router.post('/tweets', function(req, res, next){
  let name = req.body.name;
  let text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
})

module.exports = router;
