const express = require('express');
const isLoggedIn = require('./../middleware/isLoggedIn');
const router = express.Router();

const createRules = require('./../validator/conversations/create');
const editRules = require('./../validator/conversations/edit');
const removeRules = require('./../validator/conversations/remove');
const updateRules = require('./../validator/conversations/update');

router.get('/', isLoggedIn, require('./../../services/conversations/index'));
router.get('/new', isLoggedIn, require('./../../services/conversations/new'));
router.get('/edit/:slug', isLoggedIn, editRules, require('./../../services/conversations/edit'));
router.get('/:id', isLoggedIn, require('./../../services/conversations/show'));
router.post('/', isLoggedIn, createRules, require('./../../services/conversations/create'));
router.put('/:id', isLoggedIn, updateRules, require('./../../services/conversations/update'));
router.patch('/:id', isLoggedIn, updateRules, require('./../../services/conversations/update'));
router.delete('/:id', isLoggedIn, removeRules, require('./../../services/conversations/remove'));

module.exports = router;