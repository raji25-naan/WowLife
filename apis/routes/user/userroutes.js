const express = require("express");
const { oneOf } = require("express-validator");
const{signup,login,verifyOtp,uploadPhoto,EditProfile} = require("../../Controller/user/userController")
 //const { checkIsactive } = require("../../middlewares/checkActive")
 const { checkSession } = require("../../middlewares/checkAuth")
const router = express.Router();
const {
    checkRequestBodyParams,
    validateRequest,
    checkParam,
    checkQuery,
  } = require("../../middlewares/Validator");
const catch_error = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);


router.post("/Signup",
 checkRequestBodyParams("phone"),
 validateRequest,
 catch_error(signup));


router.post("/Login",
checkRequestBodyParams("userName"),
 checkRequestBodyParams("Email"),
 checkRequestBodyParams("Gender"),
validateRequest,
catch_error(login));

router.post("/verifyOtp",
 //checkSession,
 //checkIsactive,
checkRequestBodyParams("otp"),
validateRequest,

catch_error(verifyOtp)
);


router.post(
  "/uploadPhoto",
  checkSession,
  // checkIsactive,
  uploadPhoto
);


router.post("/EditProfile",
//checkSession,
//checkIsactive,

EditProfile)





module.exports = router;