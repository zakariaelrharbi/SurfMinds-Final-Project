const passport = require('passport');
const User = require('../models/User');

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id)
//         .then(user => {
//             done(null, user);
//         })
//         .catch(err => {
//             done(err);
//         });
// });

const authenticate = (req, res, next) => {
  passport.authenticate('local', { failureFlash: true }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message || 'Authentication failed' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return next()
    });
  })(req, res, next);
}

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(403).send({ message: 'You should be logged' })
}

const isAdmin = (req, res, next) =>{
  if(req.user.isAdmin === true){
    return next();
  }
  res.status(403).send({ message: 'You are not admin' })
}

module.exports = {
  isAuthenticated,
  authenticate,
  isAdmin
};