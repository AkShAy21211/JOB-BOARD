const express = require('express');
const { register, login, getMe } = require('./auth.controller');
const { protect } = require('../../middleware/auth');
const { validate, schemas } = require('../../middleware/validate');

const router = express.Router();

router.post('/register', validate(schemas.register), register);
router.post('/login',    validate(schemas.login),    login);
router.get('/me',        protect, getMe);

module.exports = router;
