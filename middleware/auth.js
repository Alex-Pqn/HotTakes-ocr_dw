const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    //store token in variable
    const token = req.headers.authorization.split(' ')[1];

    //compare tokens
    const decodedToken = jwt.verify(token, process.env.KEY_TOKEN_AUTH);

    const { userId } = decodedToken;

    //invalid token or user id not available
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID not available';
    }
    //valid token, call the next module 
    else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | 'Request not authentified' });
  }
};
