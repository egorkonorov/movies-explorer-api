const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/server-err');
const ServerError = require('../errors/server-err');
const MongoError = require('../errors/mongo-err');
const AuthorizationError = require('../errors/authorization-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getmyProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      throw new ServerError(`Произошла серверная ошибка ${err}`);
    })
    .catch(next);
};

module.exports.editUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Ошибка валидации');
      } else {
        throw new ServerError(`Произошла серверная ошибка ${err}`);
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      throw new AuthorizationError(`Ошибка авторизации ${err}`);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Ошибка валидации');
      } else if (err.code === 11000) {
        throw new MongoError('Такое имя пользователя уже используется');
      } else {
        throw err;
      }
    })
    .catch(next);
};