const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('siteuser');


passport.use(new LocalStrategy({
        usernameField : 'email'
    },
    (username,password,done)=>{
    User.findOne({email: username},(err,user)=>{
        if(err){
            return done(err);
        }
        if(!user){
            return  done(null,false,{
                message:'incorrect username'
            });
        }

        if(!user.validPassword(password)){
            return done(null,false,{
                message:'Incorrect password'
            });
        }
        console.log("user id" +user._id);
        return done(null,user);

    })
    }
    ));