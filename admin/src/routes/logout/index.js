const express = require('express');
const router = express.Router();

router.get('/', require('./../../services/logout/index'));

module.exports = router;