require('dotenv').config();
var express = require('express');
var jwt = require('jsonwebtoken');
var bearerToken = require('express-bearer-token');

var app = express();

app.use(bearerToken());
app.use(express.static('public'));

app.get('/login',function (req,res,next) {
  //TODO: Return a token
});

app.use(function (req,res,next) {
  //TODO: Implement app level middleware to protect the /protected route
  //TODO: Verify the token before allowing access to /protected
});

app.get('/protected',function (req,res,next) {
  res.send("Identity Confirmed!");
});


app.listen(3000);
