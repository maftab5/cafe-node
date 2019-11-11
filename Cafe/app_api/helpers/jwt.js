const expressJwt = require('express-jwt');
const config = require('config');


const jwt = () =>{
  const { secret } = config;

  return expressJwt({secret}).unless({
    path: [
      //public routes that do not need authentication
      '/userslogin/authenticate'
    ]
  });
}
