const jwt = require("jsonwebtoken");

module.exports.checksession = async(req,res,next)=>{
    const token = req.headers["token"];
    if(token){
        const headerType = token.split("")[0];
        const tokenType = token.split(" ")[1].trim();
        if(headerType.trim == "Bearer"){
            try{
                const decodedId = await jwt.verify(tokenValue,process.env.JWT_KEY);
            if(decodedId){
                next();
            }else{
                return res.status(401).json({
                    success:false,
                    statusCode:499,message:"UnAuthorized"
                })
            }
        }catch(error){
            console.log(err);
        return res.status(401).json({
            success:false,
            statusCode:499,
            message:"Unauthorized"
        })
    }
    }
}else{
    return res.status(401).json({
        success:false,
        statusCode:499,
        message:"Unauthorized"
    })
}
}
      