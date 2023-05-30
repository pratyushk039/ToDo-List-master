const express = require('express');

const router = express.Router();


const R = require('../controllers/render_signup');
router.get('/', R.render);

module.exports = router;