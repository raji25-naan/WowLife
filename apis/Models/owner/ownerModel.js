const mongoose = require("mongoose");
const { db_Main } = require("../../db/database");

const owner_Schema = new mongoose.Schema({

    Name:{
        type:String,

    },
    Email:{
        type:String
    },
    phone:{
        type:Number
    },
    HostelName:{
        type:String
    },
    NumberOfBeds:{
        type:String
    },
    CostPerBed:{
        type:String
    },
    Facilities:{
        type:String
    },
    otp:{
        type:String
    },
    created_At:{
        type:Date
    },
    country_code:{
        type:String,default:""
    },
})
const Owner = db_Main.model("Owner", owner_Schema);
module.exports = Owner;
    
