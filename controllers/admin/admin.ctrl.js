const models = require('../../models');
const { Op } = require('sequelize');
const passport = require('passport');

exports.get_main = (req, res) => {

    if(req.user == undefined)
    {
        res.render('admin/login');
    }
    else
    {
        models.notice_list.findAll({

        })
        .then((notice_list) => {
            res.render('admin/main',{
                notice: notice_list,
            })
        })

        
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
    console.log(req.params.id);
    res.render('admin/regist_notice');
}

exports.get_notice_member = (req, res) => {
    res.render('admin/notice_member');
}

exports.notice_regist = (req, res) => {
    const { notice_title, notice_date, company_introduce,notice_channel,company_position, company_interview } = req.body;
    console.log(notice_date);

    const main_image_path = 'upload/main_image/'+ req.file.filename;
    
    models.notice_list.create({
        notice_title: notice_title,
        notice_image: main_image_path,
        notice_info: company_introduce,
        notice_channel: notice_channel,
        notice_position: company_position,
        notice_date: notice_date,
        notice_interview: company_interview,
    })
    .then(
        res.send('<script>alert("공고를 등록하였습니다.");window.location.href="/admin";</script>')
    );
}

exports.upload_notice_image = (req, res, next) => {
    res.send({filename: req.file.filename})
}