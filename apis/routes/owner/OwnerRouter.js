const express = require("express");
const { oneOf } = require("express-validator");
const { checkSession } = require("../../middlewares/checkAuth");
const {signup,login,verifyOtp} = require("../../Controller/owner/OwnerController")
const router = express.Router();
const {
    checkRequestBodyParams,
    validateRequest,
    checkParam,
    checkQuery,
  } = require("../../middlewares/Validator");


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