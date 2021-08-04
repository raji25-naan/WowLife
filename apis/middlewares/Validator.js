const {check,validationResult,query,param} = require("express-validator");
const ErrorMessage = require("../Helpers/ErrorMessage");


const validateRequest = (req,res,next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
    const ExtractedErrors = []
    errors.array().map(err=>ExtractedErrors.push(err.msg))
    return res.json({
        success:false,
        message:ExtractedErrors[0],
    })
};
const checkRequestBodyParams = (val)=>{
    return check(val,ErrorMessage.general).isLength({min:1})
    .trim()
    .exists().withMessage(ErrorMessage.general)
}

const checkQuery =(id)=>{
    return query(id,ErrorMessage.id.required).isLength({min:1})
    .trim()
    .exists()
}
const checkParam = (id) =>{
        return param(id,ErrorMessage.id.required)
        .trim()
        .exists()
}

module.exports = {validateRequest,checkRequestBodyParams,checkQuery,checkParam}