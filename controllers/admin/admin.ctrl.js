const models = require('../../models');
const { Op } = require('sequelize');
const passport = require('passport');

exports.get_main = (req, res) => {

    res.render('admin/login');
}

exports.post_login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect('/admin');
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/admin');
        });
    })(req, res, next);
}