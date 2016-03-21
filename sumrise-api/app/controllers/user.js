var User = require('../models/user');

exports.getUser = function(req, res){
    User.findOne({
        _id: req.decoded._doc._id
    }, function(err, user) {
        if(err){
            res.json(err);
        }
        //If user not found
        if(!user) { return callback(null, false); }

        res.json({success: true, user: user});
        });
}; 

exports.getUsers = function(req, res){
    User.find(function(err, users) {
        if(err){
            res.json(err);
        }else{
            res.json(users);
        }
    });
};
