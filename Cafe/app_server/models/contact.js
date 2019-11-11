const mongoose = require("mongoose");


const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    comment: String
});

mongoose.model("contact",contactSchema);