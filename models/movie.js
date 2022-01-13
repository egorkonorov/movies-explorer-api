const mongoose = require('mongoose');
const validator = require('validator');

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
    type: String,
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
    type: String, validate: {
      validator: function (v) {
        return /https?:\/\/w{0,3}?\.?[\w\W]+/.test(v);
      },
      message: (props) => `${props.value} Неверная ссылка!`,
    },
    required: true,
  },
  trailer: {
    type: String, validate: {
      validator: function (v) {
        return /https?:\/\/w{0,3}?\.?[\w\W]+/.test(v);
      },
      message: (props) => `${props.value} Неверная ссылка!`,
    },
    required: true,
  },
  thumbnail : {
    type: String, validate: {
      validator: function (v) {
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
  movieId: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }],
  nameRu: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
