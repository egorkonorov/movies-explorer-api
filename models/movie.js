const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(v) {
        return /https?:\/\/w{0,3}?\.?[\w\W]+/.test(v);
      },
      message: (props) => `${props.value} Неверная ссылка!`,
    },
    required: true,
  },
  trailer: {
    type: String,
    validate: {
      validator(v) {
        return /https?:\/\/w{0,3}?\.?[\w\W]+/.test(v);
      },
      message: (props) => `${props.value} Неверная ссылка!`,
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator(v) {
        return /https?:\/\/w{0,3}?\.?[\w\W]+/.test(v);
      },
      message: (props) => `${props.value} Неверная ссылка!`,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
