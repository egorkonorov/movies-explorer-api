const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getmyMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const auth = require('../middlewares/auth');

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2),
    director: Joi.string().required().min(2).max(500),
    duration: Joi.number().required(),
    description: Joi.string().required().min(2),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Некорректная ссылка');
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Некорректная ссылка');
    }),
    nameRU: Joi.string().required().min(2).max(500),
    nameEN: Joi.string().required().min(2).max(500),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Некорректная ссылка');
    }),
    movieId: Joi.number().required(),
    year: Joi.string().required().min(2).max(30),
  }),
}), auth, createMovie);

router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), auth, deleteMovie);

router.get('/movies', auth, getmyMovies);

module.exports = router;
