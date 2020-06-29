const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error('Authorization Failed!');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = {
      userId: decodedToken.userId,
    };

    next();
  } catch (error) {
    const err = new Error('Authorization Failed!');
    return next(err);
  }
};
