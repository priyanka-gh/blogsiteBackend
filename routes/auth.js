const express = require('express');
const router = express.Router();
const {signout, signup, signin, isSignedIn} = require('../controllers/auth');
const { check } = require('express-validator');

router.post('/signup', [
    check('name')
        .isLength({min: 3})
        .withMessage('Invalid Length'),
    check('email')
        .isEmail()
        .withMessage('Email is required'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password length must be at least 6')
], signup);

router.post('/signin', [
    check('email')
        .isEmail()
        .withMessage('Email is required'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password Required')
], signin);


router.get('/signout', signout);

module.exports = router;