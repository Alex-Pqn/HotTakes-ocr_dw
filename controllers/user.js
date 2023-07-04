const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// user signup
exports.signup = (req, res, next) => {
  // hash the user password with 10 layers of salting
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      // create an object with email and password hashed of the user
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      // save the user in db
      user
        .save()
        .then(() =>
          res.status(201).json({ message: 'User successfully created' })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// user login
exports.login = (req, res, next) => {
  // find the user in db with email
  User.findOne({ email: req.body.email })
    .then((user) => {
      // if no user was found
      if (!user) {
        return res.status(401).json({ error: 'User not find' });
      }
      // if user was found, compare hashed password (in db) with password entered
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          // if invalid
          if (!valid) {
            return res.status(401).json({ error: 'Incorrect password' });
          }
          // if valid, return json object with userId and token of the login (with userId, secret key and expiration time)
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              // userId
              { userId: user.id },

              // secret token key
              process.env.KEY_TOKEN_AUTH,

              // expiration time of the session
              { expiresIn: '24h' }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
