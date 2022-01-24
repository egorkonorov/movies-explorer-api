const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
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
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    description: req.body.description,
    image: req.body.image,
    trailer: req.body.trailer,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
    thumbnail: req.body.thumbnail,
    movieId: req.body.movieId,
    year: req.body.year,
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
