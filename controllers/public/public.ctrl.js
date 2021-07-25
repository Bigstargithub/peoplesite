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