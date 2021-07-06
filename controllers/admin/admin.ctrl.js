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
const { Op } = require('sequelize');
const passport = require('passport');

exports.get_main = (req, res) => {

    if(req.user == undefined)
    {
        res.render('admin/login');
    }
    else
    {
        res.render('admin/main');
    }
    
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

exports.get_logout = (req,res) => {
    req.logout();
    res.send("<script>alert('로그아웃되었습니다.');location.href='/admin';</script>");
}

exports.regist_notice = (req, res) => {
    res.render('admin/regist_notice');
}

exports.get_notice_member = (req, res) => {
    res.render('admin/notice_member');
}