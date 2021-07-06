<<<<<<< HEAD
const local = require('./localStrategy');
const passport = require('passport');
=======
const passport = require('passport');
const local = require('./localStrategy');
>>>>>>> gaingebunker

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

<<<<<<< HEAD
    passport.deserializeUser((admin_id, done) => {
        done(null, admin_id);
    });

    local();
};
=======
    passport.deserializeUser((user, done) => {
        done(null, user);
    })

    local();
}
>>>>>>> gaingebunker
