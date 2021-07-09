const passport = require('passport');
<<<<<<< HEAD
const localStrategy = require('passport-local').Strategy;


module.exports = () => {
    passport.use(new localStrategy({
            usernameField: "admin_id",
            passwordField: "admin_pw",
            session: true,
            passReqToCallback: false,
        },
        async (admin_id,admin_pw,done) => {
            try{
                if(admin_id == process.env.admin_id && admin_pw == process.env.admin_pw)
                {
                    console.log("확인 완료");
                    console.log(admin_id);
                    done(null, admin_id);
                }
            }
            catch(error)
            {
=======
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
>>>>>>> gaingebunker
                console.error(error);
                done(error);
            }
        })
    )
}