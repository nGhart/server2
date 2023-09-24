const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function requireAuth(request, response, next) {
  const token = request;
  console.log('check cookie',token)
  try {
    //read token
    
    //decode token
    const decoded = jwt.verify(token, process.env.SECRET);
    //make sure token is not expired
    if (Date.now() > decoded.exp) return response.sendStatus(401);
    //find user
    const user = await User.findById(decoded.sub);
    //if user not found
    if (!user) return response.sendStatus(401);
    //if user found
    request.user = user;

    next();
  } catch (error) {
    console.log('root of the', error);
    return response.sendStatus(401);
  }
}
module.exports = requireAuth;
