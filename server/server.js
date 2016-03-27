const http = require('http');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.static(path.resolve('www')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  app.use(errorHandler());
}

app.all('/*', (req, res) => {
  console.log(path.resolve('www/index.html'));
  res.sendFile(path.resolve('www/index.html'));
});

http.createServer(app).listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
