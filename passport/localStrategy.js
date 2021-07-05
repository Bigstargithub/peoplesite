const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: "admin_id",
        passwordField: "admin_pw",
    },
        async (admin_id, admin_pw, done) => {
            try {
                if (admin_id == process.env.admin_id && admin_pw == process.env.admin_pw) {
                    done(null, admin_id);
                }
            }
            catch (error) {
                console.error(error);
                done(error);
            }
        })
    )
}