var http = require('http');
var jwt = require('jwt-simple');
var uuid = require('uuid');
var url = require('url');

function isUserExistFun(userData,request,response){
 console.log(request, 'comming request')
 console.log(userData, 'userData')

  var subdomain = 'pdi-xoogle';
  var shared_key = 'Cxvpq1neQYqKzaB9XVIoYlTa7hZGB2WaorLPa9JTXag0ZOhD';

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
}

const userData = [
  {phone:9453841101, name:'Harshit Srivastava'},
  {phone:9911130560, name:'saroj'}
]

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static(__dirname + '/public'));
const port = 3000
app.use(bodyParser.json({limit:'30mb'}))
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs');


app.get('/otpGet', (req, res) => {
  res.render('otp');
})

app.post('/otpGetData', (req, res) => {
  console.log(req.body);
  //res.render('varifyOtp');
  let phoneNo = req.body.phoneNo;
  const isMobileExists = userData.find((element)=> element.phone == phoneNo);

  console.log('isMobileExists',isMobileExists)

  if(isMobileExists){
    console.log("mobile number is already registered");
    isUserExistFun(isMobileExists,req,res);
  }else{
    
  }
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})