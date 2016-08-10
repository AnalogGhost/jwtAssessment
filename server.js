require('dotenv').config();
var express = require('express');
var jwt = require('jsonwebtoken');
var bearerToken = require('express-bearer-token');

var app = express();

app.use(bearerToken());
app.use(express.static('public'));

app.get('/login',function (req,res,next) {
  res.json(jwt.sign({user:'nathan'}, process.env.SECRET, {algorithm: 'HS512'}))
});

app.use(function (req,res,next) {
  if (req.headers.authorization){
    if (jwt.verify(req.headers.authorization, process.env.SECRET, {algorithm: 'HS512'})){
      next()
    } else {
      res.status(401).send('No.')
    }
  } else {
    res.status(401).send('No.')
  }
});

app.get('/protected',function (req,res,next) {
  res.send("Identity Confirmed!");
});


app.listen(3000);
