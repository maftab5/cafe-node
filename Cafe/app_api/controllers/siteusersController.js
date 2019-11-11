const passport = require('passport');
const mongoose = require('mongoose');
const Siteusers = mongoose.model("siteuser");
const nodemailer = require('nodemailer');



//login function
 const login = (req,res) =>{

     const user = new Siteusers();

//console.log(req.body);
     if(!req.body.email || !req.body.password){
         return res.status(400).json({message : 'All fields are required'})
     }

     passport.authenticate('local',(err,user,info) => {
         let token;
         if(err){
             return res.status(400).json(err);
         }

         if(user){
             const token = user.generateJwt();
             const id = user._id;
             res.status(200).json({token,id});
         }else{
             res.status(401).json(info);
         }
     })(req,res);
 }


const getUsers = (req, res) => {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError:No permission"
        });
    } else {
        Siteusers.find().exec(function (err, usersData) {
            if (err) {
                res.status(400).json(err);
                return;
            } else {
                if (usersData) {
                    res.status(200).json(usersData);
                } else {
                    res.status(404).json({ "message": "no users found" });
                }

            }
        })
    }
};


//to create users

const createUsers = (req,res) =>{


    const user = new Siteusers();

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.dob = req.body.dob;
    user.level = req.body.level;
    user.image = req.body.image;
    user.setPassword(req.body.password);

    user.save((err)=>{
        if(err){
            res.status(404).json(err);
        }else{
            const token = user.generateJwt();
            res.status(200).json({token});
        }

    });

    //
    // Siteusers.create({
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     email: req.body.email,
    //     password:pass,
    //     dob: req.body.dob,
    //     level: req.body.level,
    //     image:req.body.image
    // },(err,usersData)=>{
    //     if(err){
    //         res.status(400).json(err);
    //     }else{
    //         res.status(200).json(usersData);
    //     }
    // })
};

//for sending email --- don not need this code
const sendEmail = (req,res) =>{


    let user = req.body;
    sendMail(user,info=>{
console.log("The mail has been send");
res.status(401).json(info);
    });
}

async function sendMail(user,callback) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user: "aftab1234011@gmail.com",
            pass:"Soniya4321"
        }

    });
    let mailOptions = {
        from:'"Cafe site"<aftab1234011@gmail.com>',
        to:user.email,
        subject:"welcome to Cafe",
        html:`<h1>Hi ${user.name}</h1><br/><h4>Thank you</h4>`
    };
    //send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
    callback(info);
}
process.on('uncaughtException',function (err) {
    console.log(err);

})

//

//get single user
const getSingleUser = (req,res) =>{
    Siteusers.findById(req.params.userid).exec(function(err,userdata){
        if(!userdata){
            res.status(404).json({
                "message":"no user found"
            });
        }else if(err){
            return res.status(400).json(err);
        }else{
            return res.status(200).json(userdata);
        }
    })
};


//update user
const updateuser = (req,res) =>{
    if(!req.params.userid){
        res.status(400).json({
            "message":"user id is required"
        });
        return;
    }

    Siteusers.findById(req.params.userid).exec(function(err,userData){
        if(!userData){
            res.status(404).json({
                "message":"no user found"
            });
        }else if(err){
            res.status(400).json(err);
            return;
        }else{
            userData.firstName= req.body.firstName;
                userData.lastName = req.body.lastName;
                userData.email = req.body.email;
                userData.password = req.body.password;
                userData.dob = req.body.dob;
                userData.level = req.body.level;
                userData.image= req.body.image;

                userData.save(function(err,userData){
                    if(err){
                        res.status(400).json(err);
                        return;
                    }else{
                        res.status(200).json(userData);
                    }
                })

        }
    })
}

const deleteUser = (req,res) =>{
    const userid = req.params.userid;
    if(userid){
        Siteusers.findByIdAndRemove(userid).exec(function(err,userdata){
            if(err){
                return res.status(404).json(err);
            }

            res.status(204).json({
                "message" : "no user data is found"
            })
        })
    }
}


module.exports = {login,getUsers,createUsers,updateuser,getSingleUser,deleteUser,sendEmail};
