const local = require('./localStrategy');
const passport = require('passport');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((admin_id, done) => {
        done(null, admin_id);
    });

    
    local();
};