const express = require("express");
const { oneOf } = require("express-validator");
const{signup,login,verifyOtp} = require("../../Controller/user/userController")
const { checkSession } = require("../../middlewares/checkAuth");
const router = express.Router();
const {
    checkRequestBodyParams,
    validateRequest,
    checkParam,
    checkQuery,
  } = require("../../middlewares/Validator");
const catch_error = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);


router.post("/signup",
 checkRequestBodyParams("phone"),
 validateRequest,
 catch_error(signup)

);


router.post("/Login",
checkRequestBodyParams("userName"),
 checkRequestBodyParams("Email"),
 checkRequestBodyParams("Gender"),
validateRequest,
catch_error(login));

router.post("/verifyOtp",
checkRequestBodyParams("otp"),
validateRequest,
catch_error(verifyOtp)
);


module.exports = router;