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
signup

);


router.post("/login",
checkRequestBodyParams("userName"),
 checkRequestBodyParams("Email"),
 checkRequestBodyParams("Gender"),
validateRequest,
login);

router.post("/verifyOtp",
checkRequestBodyParams("otp"),
validateRequest,
verifyOtp
)


module.exports = router;