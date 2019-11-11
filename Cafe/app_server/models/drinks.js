const mongoose  = require("mongoose");
const ingredientSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    }

});

const priceSchema =  new mongoose.Schema({
    size:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    }
});

var drinksSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
   category:{
        type:String,
       required: true
   },
    ingredients:{
        type:String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    nutrition:{
        type: String,
        required: true
    },
    image:{
        type: String
    },
    status: {
        type : Number,
        default:0
    }

});


mongoose.model("drink",drinksSchema);