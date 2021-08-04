const express = require("express");
const app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
var CronJob = require("node-cron")

var UserRouter = require("./apis/routes/user/userroutes")


//app.use(timeout("20s"));
app.use(cors());


app.use(bodyParser.json({limit:"50mb"}));

let userRoutes = [].concat(UserRouter)
app.use("/api/user",userRoutes);
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



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });

  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    //res.render('error');
  });

  


  module.exports = app;