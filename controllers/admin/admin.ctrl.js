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
    const { job_group,is_continue,notice_title, company_name, company_introduce, notice_channel, job_duty,employ_type,career,company_size, 
        job_sector, notice_date, company_location, main_work, job_qualify, job_prefer, job_welfare, company_communication, company_culture, 
        company_people,next_career, notice_process, is_resume, is_portfolio, main_video, company_interview } = req.body;

    const main_image_path = req.files['notice_main_image'][0].path;
    const sample_file_path = req.files['resume_file'][0].path;
    
    models.notice_list.create({
        job_group: job_group,
        is_continue: is_continue,
        notice_title: notice_title,
        company_name: company_name,
        notice_image: main_image_path,
        company_info: company_introduce,
        company_channel: notice_channel,
        job_duty: job_duty,
        employ_type: employ_type,
        career: career,
        company_size: company_size,
        job_sector: job_sector,
        notice_date: notice_date,
        company_location: company_location,
        main_work: main_work,
        job_qualify: job_qualify,
        job_prefer: job_prefer,
        job_welfare: job_welfare,
        company_communication: company_communication,
        company_culture: company_culture,
        company_people: company_people,
        next_career: next_career,
        notice_process: notice_process,
        is_resume: is_resume,
        resume_file: sample_file_path,
        is_portfolio: is_portfolio,
        main_video: main_video,
        company_interview: company_interview,
    })
    .then(
        res.send('<script>alert("공고를 등록하였습니다.");window.location.href="/admin";</script>')
    );
}

exports.upload_notice_image = (req, res, next) => {
    res.send({filename: req.file.filename})
}

exports.update_notice_active = (req, res, next) => {
    const notice_num = req.body.number;
    res.send(notice_num);
}