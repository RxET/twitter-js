'use strict'

const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank');

router.get('/', function(req, res){
  let tweets = tweetBank.list();
  res.render('index', {tweets : tweets});
});

router.get('/users/:name', function(req, res, next){
  var name = req.params.name;
  let list = tweetBank.find({name: name});
  res.render('index', {tweets: list});
  next();
});

router.get('/tweets/:id', function(req, res, next){
  let id = parseInt(req.params.id);
  let list = tweetBank.find({id: id});
  res.render('index', {tweets: list});
  next();
});

module.exports = router;
