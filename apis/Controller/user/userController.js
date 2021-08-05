const Users = require("../../Models/user/User")
const verifyPhone = require("../../Models/user/verifyPhone")
const emailValidator = require("email-validator");

const bcrypt = require("bcrypt");
const twilio = require("../../Helpers/smsfiles");

let Twilio = new twilio();
const jwt = require("jsonwebtoken");

exports.signup = async(req,res,next)=>{
    
        let country_code = req.body.country_code;
      let phone = req.body.phone;
        if(phone.length !=10){
            return res.json({
                success:false,
                message:"please enter the valid mobile number"
            })
        }
        const findData = await Users.findOne({phone:phone});
        let otp = Math.floor(1000 + Math.random() * 9000);
            Twilio.sendOtp(otp, country_code + phone);
            console.log(otp)
    
            if(!findData){
                console.log(2)
                const  data ={
                    phone: phone,
                    country_code:country_code,
                otp:otp}

                const UserData = new Users(data)
                const saveData = await UserData.save();
                console.log(saveData._id)
                return res.json({
                    success: true,
                    OTP: saveData,
                    token:token,
                    message:"OTP sent successfully to your mobile number "
                  });
                }else{
                    const UserData = await Users.findOneAndUpdate({phone:phone},{
                        $set: {
                            otp:otp
                        }
                    },{ new: true })
                    
                    if(UserData){
                    return res.json({
                        success: true,
                        OTP: UserData,
                        message: "OTP sent successfully to your mobile number"
                    })
                }
            }
              
            }

exports.verifyOtp = async(req,res,next)=>{

    const {otp,_id} = req.body;
    
    console.log(1)
    const verifyotp = await Users.findOne({_id:_id})
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
    console.log(1)
    let{userName,Email,Gender,_id} = req.body;
    if(req.body.Email){
    const validEmail = emailValidator.validate(Email);
    if(!validEmail){
        return res.json({
            success:false,
            message:"please enter the valid email"
        })
    }
    const userInfo = await Users.findOne({ Email: Email });
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
            userName:userName,
            Email:Email,
            Gender:Gender,
            created_At:Date.now()
        }
        const update = await Users.findByIdAndUpdate({_id:_id},
            {
            $set: userData
        },{new:true})
    if(update){
        const payload = {
                    user: {
                      id: _id,
                    },
                  };
                  const token = jwt.sign(payload, process.env.JWT_KEY, {
                    expiresIn: "90d",
                  });
                  return res.json({
            success:true,
            Data:update,
            token:token,
            message:"Account registered successfully"
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


exports.uploadPhoto = async (req, res, next) => {
    console.log(1)
    const file = req.files.photo;
    const user_id = req.body.user_id;
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
      file.mv("./profile_avatar/" + file.name, async function (err, result) {
        if (err) throw err;
        const getUserInfoAndUpdate = await Users.findByIdAndUpdate(
          { _id: user_id },
          {
            $set: { avatar: file.name },
          },
          { new: true }
        );
        if (getUserInfoAndUpdate) {
          res.send({
            success: true,
            message: file.name
          });
        }
      });
    } else {
      return res.json({
        success: false,
        message: "Only jpeg and png are accepted "
      });
    }
  };


exports.EditProfile = async(req,res,next)=>{
      const user_id = req.body.user_id;
      console.log(user_id)
      const {Email,Gender,userName} = req.body;
      if(req.body.Email){
        const validEmail = emailValidator.validate(Email);
        console.log(validEmail)
        if(!validEmail){
            return res.json({
                success:false,
                message:"please enter the valid email"
            })
        }
        const userInfo = await Users.findOne({ Email: Email });
        console.log(userInfo)
        if (userInfo) {
          return res.json({
              success: false,
              message: "Email already registered!"
            });
          }
        
        else{
console.log(1)
  const saveData = await Users.findByIdAndUpdate({_id:user_id},
    {
        $set: {
          Email:Email,
          Gender:Gender,
          userName:userName
        }
    },{new:true},
    )
    console.log(saveData)
    if(saveData){

        return res.json({
            success:true,
            Data:saveData,
            messsage:"Profile edited successfully"
        })
    }
    else{
        return res.json({
            success:false,
            message:"error occured! try again"
        })
    }
  }

  }
}

