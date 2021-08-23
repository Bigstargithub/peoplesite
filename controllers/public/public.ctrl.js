const models = require('../../models');
const {Op} = require('sequelize');

exports.get_main = async (req, res) => {
    let test_num = 20
    let group = req.params.group;
    const group_list = ['마케터', '인사', '영업', '사무', '개발', 'R&D', '디자인', '기타']
    const notice_list =  await models.notice_list.findAll({});
    res.render('main',{
        test_num,
        notice_list,
        group_list,
    });
}

exports.get_main_group = async(req, res) => {
    const group = req.params.group;
    const group_list = ['마케터', '인사', '영업', '사무', '개발', 'R&D', '디자인', '기타']
    const notice_list = await models.notice_list.findAll({ where: {job_group: group}});
    if(notice_list)
    {
        res.render('main',{
            notice_list,
            group,
            group_list,
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
    const notice = await models.notice_list.findOne({ where: {number: id}});
    if(notice)
    {
        res.render('reg_notice', {
            id,
            notice,
        });
    }
}

exports.post_apply = async (req, res) => {
    const id = req.params.id;

    //파일명 추출
    const resume_file_path = req.files['resume_file'][0].path;
    var portfolio_file_path = "";
    if(req.files['portfolio_file'] != undefined)
    {
        portfolio_file_path = req.files['portfolio_file'][0].path;
    }

    //POST에서 받은 데이터 추출
    const { name, email,phone} = req.body;

    models.notice_member.create({
        notice_number: id,
        member_name: name,
        member_email:email,
        member_phone: phone,
        resume_file: resume_file_path,
        portfolio_file: portfolio_file_path,
    }).then(() => {
        res.cookie('apply',1);
        }
    )


}