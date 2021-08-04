const mongoose = require("mongoose");
const { db_Main } = require("../../db/database");

const user_schema = new mongoose.Schema({

    userName :{
        type: String,
    
  },
    Email:{
        type:String,
        
    },
Gender:{
    type:String,
    
},
created_At: {
    type: Date,
  },
  phone:{
      type:Number,

  },
  country_code:{
      type:String,default:""
  },
  otp:{
      type:String,
      default:""
  }
})
const user = db_Main.model("users", user_schema);
module.exports = user;