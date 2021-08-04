// const Owners = require("../../Models/owner/ownerModel");
// const Users = require("../../Models/user/User")
// const verifyPhone = require("../../Models/user/verifyPhone")
// const emailValidator = require("email-validator");
// const bcrypt = require("bcrypt");
// const twilio = require("../../Helpers/smsfiles");
// let Twilio = new twilio();


// exports.signup = async(req,res,next)=>{
//     let country_code = req.body.country_code;
//   let phone = req.body.phone;
//     if(phone.length !=10){
//         return res.json({
//             success:false,
//             message:"please enter the valid mobile number"
//         })
//     }
//     const findData = await Owners.findOne({phone:phone});
//     let otp = Math.floor(1000 + Math.random() * 9000);
//         Twilio.sendOtp(otp, country_code + phone);
//         console.log(otp)

//         if(!findData){
//             const  data ={
//                 phone: phone,
//                 country_code:country_code,
//             otp:otp}
//             const UserData = new Owners(data)
//             const saveData = await UserData.save();
//             console.log(saveData)