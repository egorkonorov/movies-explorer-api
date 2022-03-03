const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  editUserProfile, getmyProfile,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
}), auth, editUserProfile);

router.get('/users/me', auth, getmyProfile);

module.exports = router;
