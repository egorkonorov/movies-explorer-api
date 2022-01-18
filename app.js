const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const { errors } = require('celebrate');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { DATABASE_ADRESS, NODE_ENV } = process.env;

const allowedCors = [
  'https://frontend.diploma.nomoredomains.rocks',
  'http://frontend.diploma.nomoredomains.rocks',
  'http://localhost:3000',
  'http://localhost:3000',
  'https://localhost:3001',
  'https://localhost:3001',
];

const { PORT = 3000 } = process.env;
const app = express();

app.use(function(req, res, next) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.status(200).send({ message: 'OK' });
  }
  next();
});

mongoose.connect(NODE_ENV === 'production' ? DATABASE_ADRESS : 'mongodb://localhost:27017/diplomabd');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(require('./routes/users'));

app.use(require('./routes/movies'));

app.use(require('./routes/signin'));

app.use(require('./routes/signup'));

app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});
app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
