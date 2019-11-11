const mongoose = require("mongoose");
const Contact = mongoose.model("contact");
const nodemailer = require("nodemailer");


const createContact = (req,res) =>{
    const contact = new Contact();

    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.address = req.body.address;
    contact.comment = req.body.comment;

    contact.save((err,data)=>{
        if(err){
            res.status(401).json(err);
        }else{
            res.status(200).json(data);

            // let user = req.body;
            sendMail(data,info=>{
                console.log("The mail has been send");
                res.status(401).json(info);
            });


        }
    })

}

//for sending email
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




module.exports = {createContact};