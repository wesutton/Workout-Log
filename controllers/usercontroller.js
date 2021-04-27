const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', function (req,res){
    User.create ({
        username: req.body.username,
        passwordhash: bcrypt.hashSync(req.body.passwordhash, 13)
    })
    .then(
        function(user){
            let token =jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "1d"});
            let responseObject = {
                user: user,
                message: 'User successfully created!',
                sessiontoken: token
            };
            res.json(responseObject);
        })
        .catch(function(err){
                res.status(500).json({error: err})
        });
});

router.post('/login', function(req,res){
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(function loginSuccess(user){
        if(user){
            bcrypt.compare(req.body.passwordhash, user.passwordhash, function(err, matches){
            
            if(matches){
           
            let token =jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "1d"});
        res.status(200).json ({
            user: user,
            message: "User successfully logged in!",
            sessiontoken: token
            
        })
    }else {
        res.status(502).send({error: "Login Failed"});
    }
    });
    }else {
        res.status(500).json({error: 'Username does not exist.'})
    }
    })
    .catch(err => res.status(500).json({error: err}))
});

module.exports = router;