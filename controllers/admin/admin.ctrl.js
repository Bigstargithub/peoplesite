const models = require('../../models');
const { Op } = require('sequelize');
const passport = require('passport');
const fs = require('fs');

exports.get_main = async (req, res) => {

    if(req.user == undefined)
    {
        res.render('admin/login');
    }
    else
    {
        const notice_lists = await models.notice_list.findAll({});
        // console.log(notice_lists);
        if(notice_lists)
        {
            res.render('admin/main', {notice_lists});
        }
        else
        {
            res.render('admin/main');
        }
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
            res.cookie('admin_id',process.env.admin_id);
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

exports.notice_regist = async (req, res) => {
    try{
        const { job_group,is_continue,notice_title, company_name, company_introduce, notice_channel, job_duty,employ_type,career,company_size, 
            job_sector, notice_date, position_info, company_location, main_work, job_qualify, job_prefer, job_welfare, company_communication, company_culture, 
            company_people,next_career, notice_process, is_resume, is_portfolio, main_video, company_interview } = req.body;

        const main_image_path = req.files['notice_main_image'][0].path;
        if(req.files['resume_file'] == undefined)
        {
            sample_file_path = '';
        }
        else
        {
            const sample_file_path = req.files['resume_file'][0].path;
        }
        
        
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
            position_info: position_info,
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
            notice_interview: company_interview,
        })
        .then(
            res.send('<script>alert("공고를 등록하였습니다.");window.location.href="/admin";</script>')
        );
    }
    catch(error){
        console.error(error);
    }
}

exports.upload_notice_image = (req, res, next) => {
    res.send({filename: req.file.filename})
}

exports.update_notice_active = (req, res, next) => {
    const notice_num = req.body.number;
    const notice_continue = req.params.id;
    console.log(notice_num);
    models.notice_list.update({is_continue: notice_continue}, {
        where: {
            number: notice_num,
        }
    })
    .then(() => {
        res.send('hi');
    })
    .catch((err)=> {
        console.error(err);
    })
}

exports.update_notice_status = (req, res) => {
    const notice_number = req.body.number;
    const notice_status = req.params.id;
    models.notice_list.update({ is_active: notice_status}, {
        where:{
            number: notice_number,
        }
    })
    .then(() => {
        res.send('did it');
    });
}

exports.get_modify_notice = async (req, res) => {
    const notice_number = req.params.id;
    models.notice_list.findOne({where:{
        number: notice_number,
    }}).then((notice_detail) => {
        const main_work = notice_detail.main_work.split(',');
        const qualify = notice_detail.job_qualify.split(',');
        const prefer = notice_detail.job_prefer.split(',');
        const welfare = notice_detail.job_welfare.split(',');
        const communication = notice_detail.company_communication.split(',');
        const culture = notice_detail.company_culture.split(',');
        const people = notice_detail.company_people.split(',');
        const next_career = notice_detail.next_career.split(',');
        const process = notice_detail.notice_process.split(',');

        res.render('admin/modify_notice', {
            notice_detail: notice_detail,
            main_work,
            qualify,
            prefer,
            welfare,
            communication,
            culture,
            people,
            next_career,
            process,

            });
    })
    
}

exports.delete_notice = async (req, res) => {
    const id = req.params.id;
    models.notice_list.destroy({
        where: {
            number: id
        }
    })
    .then(
        res.send('<script>alert("삭제되었습니다"); location.href="/admin"; </script>')
    );
}

exports.post_modify_notice = async (req, res) => {
    try{
        const id = req.params.id;
        const { job_group,is_continue,notice_title, company_name, company_introduce, notice_channel, job_duty,employ_type,career,company_size, 
            job_sector, notice_date, position_info, company_location, main_work, job_qualify, job_prefer, job_welfare, company_communication, company_culture, 
            company_people,next_career, notice_process, is_resume, is_portfolio, main_video, company_interview } = req.body;
            models.notice_list.update({
                job_group,
                is_continue,
                notice_title,
                company_name,
                company_introduce,
                notice_channel,
                job_duty,
                employ_type,
                career,
                company_size,
                job_sector,
                notice_date,
                company_location,
                position_info,
                main_work,
                job_qualify,
                job_prefer,
                job_welfare,
                company_communication,
                company_culture,
                company_people,
                next_career,
                notice_process,
                is_resume,
                is_portfolio,
                main_video,
                notice_interview: company_interview,
            },{
                where: {
                    number: id,
                }
            });
        if(is_resume == 0)
        {
            const notice_detail = await models.notice_list.findOne({where: {number: id}});

            fs.unlink(notice_detail.dataValues.resume_file,(err) => err ?
            console.error(err) : console.log('와후'));
            models.notice_list.update({
                resume_file: '',
            }, {
                where: {
                    number: id,
                }
            });

        }
        
        if(req.files['notice_main_image'] != undefined && req.files['resume_file'] != undefined)
        { 
            const main_image_path = req.files['notice_main_image'][0].path;
            const resume_file_path = req.files['resume_file'][0].path;

            models.notice_list.update({
                notice_image: main_image_path,
                resume_file: resume_file_path,
            },{
                where: {
                    number: id,
                }
            });
        }
        else if(req.files['notice_main_image'] == undefined)
        {
            if(req.files['resume_file'] != undefined)
            {
                const resume_file_path = req.files['resume_file'][0].path;
                models.notice_list.update({
                    resume_file: resume_file_path,
                },{
                    where: {
                        number: id,
                    }
                });
            }
        }
        else if(req.files['notice_main_image'] != undefined)
        {
            const main_image_path = req.files['notice_main_image'][0].path;
            models.notice_list.update({
                notice_image: main_image_path,
            },{
                where: {
                    number: id,
                }
            });
        }
    }
    catch(error){
        console.error(error);
    }
    res.send('<script>alert("공고를 수정하였습니다.");window.location.href="/admin";</script>')
}

exports.get_applies_list = async (req, res) => {
    const id = req.params.id;

    const applies_list = await models.notice_member.findAll({where: {notice_number: id}});
    if(applies_list)
    {
        res.render('admin/notice_apply_member', {
            apply_list: applies_list,
        })
    }
}

exports.post_update_applies = async (req, res) => {
    const id = req.params.id;
    const { comment, state } = req.body;

    models.notice_member.update({
        state,
        comment,
    },{
        where: {number: id}
    }).then(() => {
        res.send("<script>alert('저장되었습니다');window.history.back();</script>");
    })


}