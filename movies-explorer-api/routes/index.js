const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const signUpRouter = require('./signup');
const signInRouter = require('./signin');
const auth = require('../middlewares/auth');

router.use('/', signUpRouter);
router.use('/', signInRouter);
router.use('/', auth, usersRouter);
router.use('/', auth, moviesRouter);

module.exports = router;
