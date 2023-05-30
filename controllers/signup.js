const express = require('express');
const db = require('../configs/mongoose.js');
const app = express();
const Users=require('../schemas/users');
module.exports.signup = function(req, res){
    var rec_email = req.body.email;
    var rec_password = req.body.password;
    Users.findOne({email:rec_email},function(err,doc){
        if(err){console.log(err);return;}
        if(doc){
            console.log("User already exists");
            return res.redirect('/render_signin');
        }
        else{
            Users.create({
                email:rec_email,
                password:rec_password
            },
            function(err,newUser){
                if(err){console.log(err);return;}
                return res.redirect('/render-signin');
            })
        }
    })
}