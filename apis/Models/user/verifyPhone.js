const mongoose = require("mongoose");
const { db_Main } = require("../../db/database")

const verifiedPhone = new mongoose.Schema({

    verifiedPhone : [],
    
  
});

module.exports = db_Main.model("verifiedPhone", verifiedPhone);
