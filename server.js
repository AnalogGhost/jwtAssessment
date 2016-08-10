require('dotenv').config();
var express = require('express');
var jwt = require('jsonwebtoken');
var bearerToken = require('express-bearer-token');

var app = express();

app.use(bearerToken());
app.use(express.static('public'));

app.get('/login',function (req,res,next) {
  var token = jwt.sign({ user: 'signed in'}, 'shhhhhh')
  res.json({
    token: token
  })
});

app.use(function (req,res,next) {
    if(jwt.verify(req.headers.user, 'shhhhhh')){
      next();
    }
});

app.get('/protected',function (req,res,next) {
  res.send("Identity Confirmed!");
});


app.listen(3000);
