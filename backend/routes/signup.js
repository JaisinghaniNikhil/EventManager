const express = require('express');
const signup = require('../controllers/signupcontroller');
const router = express.Router();

router.post('/',signup);

module.exports= router;