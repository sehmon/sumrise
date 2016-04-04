var User = require('../models/user');
var jwt = require('jsonwebtoken');

exports.verifyToken = function(req, res, next) {
    var token = req.body.token || req.params.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token, req.app.get('superSecret'), function(err, decoded){
            if(err){
                return res.json({ success: false, message: "Failed to authenticate token" });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: "No token provided with request"
        });
    }
}

exports.signup = function(req, res){
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function(err) {
        if(err){
            res.json({success: false, message: err});
        } else {
            res.json({ success: true, message: "New user added to database"});
        }
    });
};

exports.login = function(req, res) {
    User.findOne({
        username: req.body.username
      }, function(err, user) {
        if(err) {
            res.json(err)
        } if(!user){
            res.json({success: false, message: "User not found"});
        } else if (user) {
            user.verifyPassword(req.body.password, function(err, isMatch){
                if(err) throw err;

                //Passwords match
                if(!isMatch){
                    res.json({success: false, message: "Auth failed, incorrect password"});
                }
                var token = jwt.sign(user, req.app.get('superSecret'), {
                    expiresInMinues: (60*24*7*52) // Year long, need to make this more secure
                });
                res.json(token);
            });
        }
    });
};
