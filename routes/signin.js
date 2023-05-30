const express = require('express');
const passport = require('passport');
const router = express.Router();


const sup = require('../controllers/signin');
router.post('/',passport.checkAuthentication ,sup.signin);

module.exports = router;