require('dotenv').config();
var express = require('express');
var jwt = require('jsonwebtoken');
var bearerToken = require('express-bearer-token');

var app = express();

app.use(bearerToken());
app.use(express.static('public'));

app.get('/login', function(req, res, next) {
    var user = {
        name: 'Boss Johnson',
        position: 'Premier of British Columbia',
        realName: 'Björn Ingimar Jónsson',
        realRealName: 'Josh Newsom'
    };
    var token = jwt.sign(user, process.env.SECRET);
    res.json({
        token: token
    });
});

app.use(function(req, res, next) {
    var token = req.token;
    var secret = process.env.SECRET;
    jwt.verify(token, secret, function(err, decodedToken) {
        if (err) {
            res.sendStatus(400);
        } else {
            console.log(decodedToken);
            next();
        }
    });
});

app.get('/protected', function(req, res, next) {
    res.send("Identity Confirmed!");
});


app.listen(3000);
