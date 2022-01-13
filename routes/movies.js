const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getmyMovies, createMovie, deleteMovie
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(2).max(500),
    image: Joi.string().pattern(/https?:\/\/w{0,3}?\.?[\w\W]+/),
    trailer: Joi.string().pattern(/https?:\/\/w{0,3}?\.?[\w\W]+/),
    nameRU: Joi.string().required().min(2).max(500),
    nameEN: Joi.string().required().min(2).max(500),
    thumbnail: Joi.string().pattern(/https?:\/\/w{0,3}?\.?[\w\W]+/),
    movieId: Joi.string().required().min(2).max(500),
    year: Joi.string().required().min(2).max(30),
  }),
}), auth, createMovie);

router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().min(2).max(500),
  }),
}), auth, deleteMovie);

router.get('/movies', auth, getmyMovies);

module.exports = router;