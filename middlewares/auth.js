const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorization-err');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AuthorizationError('Ошибка авторизации');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthorizationError('Ошибка авторизации'));
  }

  req.user = payload;

  next();
};
