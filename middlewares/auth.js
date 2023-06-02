const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  jwt.verify(token, 'your-secret-key', async (error, decoded) => {
    if (error) {
      return res.status(401).send({ error: 'Authentication failed' });
    }
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    if (!user) {
      return res.status(401).send({ error: 'Authentication failed' });
    }
    req.user = user;
    req.token = token;
    next();
  });
};

module.exports = authenticate;
