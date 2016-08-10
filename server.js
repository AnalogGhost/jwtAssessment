require('dotenv').config();
var express = require('express'),
  jwt = require('jsonwebtoken'),
  bearerToken = require('express-bearer-token'),
  app = express();

app.use(bearerToken());
app.use(express.static('public'));

app.get('/login', (req, res) => res.json({token: jwt.sign({data: "something"}, "lazysecret")}));

app.use((req, res, next) => jwt.verify(req.token, "lazysecret", (err, decoded) => {
  !err ? next() : res.send("nah doe");
}));

app.get('/protected', (req, res) => res.send("Identity Confirmed!"));


app.listen(3000);
