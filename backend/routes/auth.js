const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConf = require('../config/passport');

const User = require('../models/user');

const UsersController = require('../controllers/users');

const passportLocalMW = passport.authenticate('local', { session: false, failureRedirect:'/api/auth/fail/login'});
const passportJwtMW = passport.authenticate('jwt', { session: false, failureRedirect:'/api/auth/fail/unauth'});

router.post('/register', UsersController.register);

router.post('/login',passportLocalMW, UsersController.login);

router.get('/secret',passportJwtMW, UsersController.secret)

router.get('/fail/:type', UsersController.fail);

module.exports = router;