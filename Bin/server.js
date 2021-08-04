var index = require("../index");
var debug = require("debug")("app:server");
var https = require("http");

var dotenv = require("dotenv");

dotenv.config({path:"./dev.env"});

/**
 * Get port from environment and store in Express.
 */

 const hostname = "localhost";
 const port = 3000; //normalizePort(process.env.PORT || '3000');
 index.set("port", port);


 /**
 * Create HTTP server.
 */


  var server = https.createServer(index);



  server.listen(port,hostname,()=>{
      debug(`Server running on http://${hostname}:${port}/`);
      console.log(`Server running on http://${hostname}:${port}/`)
  })


  server.on("error",onError);
  server.on("listening",onListening)


  function normalizePort(value){
      var port = parseInt(val,10);

      if(isNaN(port)){
          // named pipe
          return val;
      }
      if(port>=0){
          // port number
          return port
      }
      return false;
  }



  function onError(error){
      if(error.syscall!== "listen"){
          throw err;
      }
  

  var bind = typeof port === "string"?"pipe" + port :"Port"+port;
  switch(error.code){
      case "EACCES":
          console.error(bind +"requires elevated privileges");
        process.exit(1)
    break;
    case "EADDRINUSE":
        console.error(bind + "Already in Use");
        process.exit(1);
        break;
        default:
            throw error
        }
}
/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(){
    var address = server.address();
    var bind = typeof port === "string"? "pipe"+ address :"port"+address.port;
    debug("Listening on" +bind)
}


