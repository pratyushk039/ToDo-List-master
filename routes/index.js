const express = require('express');
const router = express.Router();
const signupCont = require('../controllers/render_signin');

console.log('router loaded');
router.get('/', signupCont.render);
router.use('/render-signup', require('./render-signup'));
router.use('/addtask', require('./add'));
router.use('/deletetask', require('./delete'));
router.use('/toggle', require('./toggle'));
router.use('/signup',require('./signup'));
router.use('/home',require('./home'));
router.use('/signin',require('./signin'));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));
//e.g. router.use('/users', require('./users'));


module.exports = router;