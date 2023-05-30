const express = require('express');

const router = express.Router();


const sup = require('../controllers/signup');
router.post('/', sup.signup);

module.exports = router;