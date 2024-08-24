const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require("./models/userSchema");

passport.use(new LocalStrategy({
    usernameField: 'email', // Specify that the username field is 'email'
    passwordField: 'password' // This is optional because 'password' is the default
  }, async (email, password, done) => {
    try {
        console.log("Received credentials:", email, password);
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        const isPasswordMatch = user.comparePassword(password);
        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password' });
        }
    } catch (err) {
        return done(err);
    }
}));

module.exports = passport;