// const express = require('express')
// const app = express();
// app.use(express.json());
// const { connection } = require("./configs/db");


// app.get("/",function(req,res){
  
//   res.send("welcome to home")
// })

// app.listen(process.env.port, async () => {
//     try {
//       await connection;
//       // console.log(connection);
//       console.log("connected to db");
//     } catch (error) {
//       console.log(error.message);
//       // res.send("something went wrong")
//     }
//     console.log(`server running at ${process.env.port} `);
//   });
  

var http = require('http');
var jwt = require('jwt-simple');
var uuid = require('uuid');
var url = require('url');

var subdomain = 'pdi-xoogle';
var shared_key = 'Cxvpq1neQYqKzaB9XVIoYlTa7hZGB2WaorLPa9JTXag0ZOhD';

http.createServer(function (request, response) {
  var payload = {
    iat: (new Date().getTime() / 1000),
    jti: uuid.v4(),
      name: 'Harshit Srivastava',
    email: 'harshit@xoogle.in'
  };

  // encode
  var token = jwt.encode(payload, shared_key);
  console.log("token",token)
  var redirect = 'https://' + subdomain + '.zendesk.com/access/jwt?jwt=' + token;
  console.log("redirect",redirect)

  var query = url.parse(request.url, true).query;

  if(query['return_to']) {
    redirect += '&return_to=' + encodeURIComponent(query['return_to']);
  }

  response.writeHead(302, {
    'Location': redirect
  });
  response.end();
}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');