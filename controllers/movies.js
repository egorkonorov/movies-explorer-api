const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/server-err');
const ServerError = require('../errors/server-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getmyMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch((err) => {
      throw new ServerError(`Произошла серверная ошибка ${err}`);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({
    name: req.body.name,
    country: req.body.name,
    director: req.body.name,
    duration: req.body.name,
    description: req.body.name,
    image: req.body.name,
    trailer: req.body.name,
    nameRU: req.body.name,
    nameEN: req.body.name,
    thumbnail: req.body.name,
    movieId: req.body.name,
    year: req.body.name,
    owner: req.user._id,
  })

    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Ошибка валидации');
      } else {
        throw new ServerError(`Произошла серверная ошибка ${err}`);
      }
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const currentUser = req.user._id;
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie === null) {
        throw new NotFoundError('Нет фильма с таким id');
      } else if (!movie.owner.equals(currentUser)) {
        return next(new ForbiddenError('Недостаточно прав'));
      } else {
        return movie.remove()
          .then(() => res.send({ message: 'Фильм удален' }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Ошибка валидации');
      } else {
        throw err;
      }
    })
    .catch(next);
};