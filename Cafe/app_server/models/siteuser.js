const mongoose = require("mongoose");
var crypto = require('crypto');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName : {
        type:String,
        required:true
    },

    email: {
        type: String,
        unique:true,
        required : true
    },
    dob : {
        type: Date

    },
    // password:{
    //     type:String,
    //     required: true
    // },
    level: {
        type: Number
    },
    image:{
        type: String
        },
    hash:String,
    salt:String,
    password: String,
    role: {
        type: String,
        default: "user"
    }
  

});
userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password,this.salt,100,64,'sha512').toString('hex');
}

userSchema.methods.validPassword = function(password){
    const hash = crypto.pbkdf2Sync(password,this.salt,100,64,'sha512').toString('hex');

    return this.hash === hash;
    // return password;
}
// for jwt
userSchema.methods.generateJwt = function(){
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        firstName: this.firstName,
        email: this.email,
        role: this.role,
        exp: parseInt(expiry.getTime() / 1000, 10),
    },"thisIsSecret");
};

mongoose.model('siteuser',userSchema);