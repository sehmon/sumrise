var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
              },
    password: {
        type: String,
        required: true
              }
});

UserSchema.pre('save', function(callback) {
    console.log("Going through pre-save");
    var user = this;

    if(!user.isModified('password')){
        console.log("Password not changed, no need to change db");
        return callback();
    }

    //Password is changed so encrypt it
    bcrypt.genSalt(5, function(err, salt) {
        console.log("Generating salt");
        if(err){
            console.log(err);
            return callback(err);
        }

        //Hash Password and reset it
        bcrypt.hash(user.password, salt, null, function(err, hash){
            console.log("Hashing Password");
            if(err){
                console.log(err);
                return callback(err);
            }
            console.log("No Error");
            user.password = hash;
            callback();
        });
    });
});

UserSchema.methods.verifyPassword = function(password, cb){
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
