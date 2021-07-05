const models = require('../../models');
const {Op} = require('sequelize');
const passport = require('passport');

exports.get_main = (req, res) => {
    if(req.session.passport){
        console.log(req.session.passport.user);
    }
    
    res.render('admin/login');
}

exports.post_login = (req, res, next) => {
    console.log(req.body);
    // res.redirect('/admin');
    
    passport.authenticate('local', (user,info) => {
        res.redirect('/login');
    });(req,res,next);
}