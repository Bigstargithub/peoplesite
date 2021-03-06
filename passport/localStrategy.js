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
                else
                {
                    res.send("<script>alert('아이디 또는 비밀번호가 다릅니다.')</script>");
                    location.reload();
                }
            }
            catch (error) {
                console.error(error);
                done(error);
            }
        })
    )
}