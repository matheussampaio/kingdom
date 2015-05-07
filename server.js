var path = require('path');
var express = require('express');
var app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/templates/:name', function (req, res) {
    res.sendFile(path.join(__dirname, 'templates', req.params.name));
});

app.listen(3000);