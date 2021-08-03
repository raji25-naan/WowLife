const express = require("express");
const app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");


app.use(timeout("20s"));
app.use(cors());


app.use(bodyParser.json({limit:"50mb"}));


app.use(bodyParser.urlencoded({
    limited:"50mb",
    extended:true,
    parameterLimit:1000000})
)


app.use(logger("dev"));


app.use(cookieParser());


app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin","*"),
    res.header("Access-Control-Allow-Headers","Origin,X-requested-With,Content-Type,authtoken,access-token,Accept,authorization"),
    res.headers("Access-Control-Allow-Methods","*")
})



    app.listen("7000",(req,res)=>{
    console.log(`server started at` + 7000)
})