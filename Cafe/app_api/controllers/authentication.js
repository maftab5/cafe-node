const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('siteuser');

const register = (req,res) =>{
    if(!req.body.firstName || !req.body.email || !req.body.password){
        return res.status(400).json({message:"all fields required as of"});
    }
    const user = new User();

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.dob = req.body.dob;
    user.level = req.body.level;
    user.image = req.body.image;
    user.setPassword(req.body.password);

    user.save((err)=>{
        if(err){
            res.status(404).json({message:"this is "});
        }else{
            const token = user.generateJwt();
            res.status(200).json({token});
        }

    })

}

module.exports = {register}