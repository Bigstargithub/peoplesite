const Sequelize = require('sequelize');


module.exports = function(sequelize, dataTypes)
{
    const notice_member = sequelize.define('notice_member',{
        number: {type: Sequelize.INTEGER(11), primaryKey: true, autoIncrement: true},
        notice_number :{type: Sequelize.INTEGER(11), allowNull: false},
        member_name:{ type:Sequelize.STRING(20), allowNull: false},
        member_email:{type: Sequelize.STRING(100), allowNull: false},
        member_phone:{type: Sequelize.STRING(20), allowNull: false},
        resume_file:{type: Sequelize.STRING(200), allowNull:false},
        portfolio_file: {type: Sequelize.STRING(200)},
        job_description:{type: Sequelize.TEXT},
        comment: {type: Sequelize.TEXT},
        state: {type:Sequelize.INTEGER(2)},
    },
    {tableName: 'notice_member'});

  

    return notice_member;
}