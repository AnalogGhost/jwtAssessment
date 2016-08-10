require('dotenv').config();
var express = require('express');
var jwt = require('jsonwebtoken');
var bearerToken = require('express-bearer-token');

var app = express();

app.use(bearerToken());
app.use(express.static('public'));

app.get('/login',function (req,res,next) {
  var user = {
    name: "Ian",
    isAdmin: true
  }
  res.json({token: jwt.sign(user, process.env.SECRET)});
});

app.use(function (req, res, next) {
  //TODO: Implement app level middleware to protect the /protected route
  console.log(req.token);
  jwt.verify(req.token, process.env.SECRET, function(err) {
    if (!err) {
      next();
    } else {
      res.status(400).send("Not found. :(")
    }
  })
});

app.get('/protected',function (req,res,next) {
  res.send("Rock and roll!");
});


app.listen(3000);
