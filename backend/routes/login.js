const express = require('express');
const login = require('../controllers/logincontoller');
const router = express.Router();

router.post('/',login);

module.exports= router;