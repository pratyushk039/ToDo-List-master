const express = require('express');
const app = express();
module.exports.render = function(req, res){
    return res.render('signin');
}