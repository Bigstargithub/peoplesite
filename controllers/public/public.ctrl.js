const models = require('../../models');
const {Op} = require('sequelize');

exports.get_main = async (req, res) => {
    var test_num = 20
    const notice_list =  await models.notice_list.findAll({});
    res.render('main',{
        test_num,
        notice_list,
    });
}

exports.get_main_group = async(req, res) => {
    const group = req.params.group;
    const notice_list = await models.notice_list.findAll({ where: {job_group: group}});
    if(notice_list)
    {
        res.render('main',{
            notice_list,
            group,
        })
    }
}

exports.get_notice_detail = async( req, res) => {
    const id = req.params.id;
    const notice = await models.notice_list.findOne({ where: {number: id}});
    if(notice)
    {
        var main_work = notice.main_work.split('\n');
        var job_qualify = notice.job_qualify.split('\n');
        var job_prefer = notice.job_prefer.split('\n');
        var job_welfare = notice.job_welfare.split('\n');
        var company_communication = notice.company_communication.split('\n');
        var company_culture = notice.company_culture.split('\n');
        var company_people = notice.company_people.split('\n');
        var next_career = notice.next_career.split('\n');
        var notice_process = notice.notice_process.split(',');

        res.render('notice_detail',{
            notice,
            main_work,
            job_qualify,
            job_prefer,
            job_welfare,
            company_communication,
            company_culture,
            company_people,
            next_career,
            notice_process,
        });
    }
}

exports.get_apply = async (req, res) => {
    const id = req.params.id;
    res.render('reg_notice', {
        id,
    });
}