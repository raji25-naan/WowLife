const Owners = require("../../Models/owner/ownerModel");
const Users = require("../../Models/user/User")
const verifyPhone = require("../../Models/user/verifyPhone")
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const twilio = require("../../Helpers/smsfiles");
let Twilio = new twilio();


exports.signup = async(req,res,next)=>{
    let country_code = req.body.country_code;
  let phone = req.body.phone;
    if(phone.length !=10){
        return res.json({
            success:false,
            message:"please enter the valid mobile number"
        })
    }
    const findData = await Owners.findOne({phone:phone});
    let otp = Math.floor(1000 + Math.random() * 9000);
        Twilio.sendOtp(otp, country_code + phone);
        console.log(otp)

        if(!findData){
            const  data ={
                phone: phone,
                country_code:country_code,
            otp:otp}
            const UserData = new Owners(data)
            const saveData = await UserData.save();
            console.log(saveData)

            return res.json({
                success: true,
                Data: saveData,
                message: "OTP sent successfully to your mobile number "
              });
            }else{
                return res.json({
                    success: false,
                    message: " Your Number is already registered please contact the admin"
                })
            }
        
          
        }


exports.verifyOtp = async(req,res,next)=>{
            const {otp,_id} = req.body
        
            const verifyotp = await Owners.findOne({_id:_id})
            const otpDb = verifyotp.otp;
            console.log(verifyotp)
            if(otpDb == otp){
                return res.json({
                    success:true,
                    message:"otp verified successfully"
                })
            }else{
                return res.json({
                    success:false,
                    message:"Incorrect Otp"
                })
            }
        
        }
        





exports.login = async(req,res,next)=>{
    let{Name,Email,phone,HostelName,NumberOfBeds,CostPerBed,Facilities,_id} = req.body;
    if(req.body.Email){
    const validEmail = emailValidator.validate(Email);
    if(!validEmail){
        return res.json({
            success:false,
            message:"please enter the valid email"
        })
    }
    const userInfo = await Owners.findOne({ Email: Email });
    if (userInfo) {
      if (Email == userInfo.Email) {
        return res.json({
          success: false,
          message: "Email already registered!"
        });
      }
    }
    else {
        let userData;
        userData = {
            Name:Name,
            Email:Email,
            phone:phone,
            Facilities:Facilities,
            HostelName:HostelName,
            NumberOfBeds:NumberOfBeds,
            CostPerBed:CostPerBed,
            created_At:Date.now()
        }
        const update = await Owners.findByIdAndUpdate({_id:_id},
            {
            $set: userData
        },{new:true})
        console.log(update)
    if(update){
        return res.json({
            success:true,
            Data:update,
            message:"Account registered successfully, admin will reach you shortly"
        })

    }else{
        return res.json({
            success:false,
            message:"Error occured!" + error
        })    
    }
}
    }
}