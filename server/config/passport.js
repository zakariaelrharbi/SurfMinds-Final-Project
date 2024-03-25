const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    // Find user by email
    const user = await User.findOne({ email });

    // If user not found or password incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return done(null, false, { message: 'Invalid email or password' });
    }

    // If user and password are correct
    return done(null, user);
  } catch (err) {
    console.error(err);
    return done(err);
  }
}));

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    console.error(err);
    done(err);
  }
});