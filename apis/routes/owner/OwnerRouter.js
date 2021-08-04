const express = require("express");
const { oneOf } = require("express-validator");
const { checkSession } = require("../../middlewares/checkAuth");
const {signup,login,verifyOtp} = require("../../Controller/owner/OwnerController")
const router = express.Router();
const catch_error = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

const {
    checkRequestBodyParams,
    validateRequest,
    checkParam,
    checkQuery,
  } = require("../../middlewares/Validator");


  router.post("/signup",
 checkRequestBodyParams("phone"),
 validateRequest,
 catch_error(signup)

);

router.post("/login",
checkRequestBodyParams("userName"),
 checkRequestBodyParams("Email"),
 checkRequestBodyParams("Gender"),
validateRequest,
catch_error(login));

router.post("/verifyOtp",
checkRequestBodyParams("otp"),
validateRequest,
catch_error(verifyOtp)
)

module.exports = router;