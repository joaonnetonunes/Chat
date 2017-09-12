const express = require('express');
const isLoggedIn = require('./../middleware/isLoggedIn');
const router = express.Router();

router.get('/', isLoggedIn, require('./../../services/main'));

module.exports = router;