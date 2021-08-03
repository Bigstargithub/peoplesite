const { Sequelize } = require('sequelize');
const models = require('../models');

module.exports = function(sequelize, dataTypes){
    const notice_list = sequelize.define('notice_list', {
        number: {type: Sequelize.INTEGER(11), primaryKey: true, autoIncrement: true},
        job_group: {type: Sequelize.STRING(20), allowNull: false},
        is_continue:{type: Sequelize.INTEGER(1), defaultValue: 1},
        notice_title: {type: Sequelize.STRING(100), allowNull: false},
        company_name:{type: Sequelize.STRING(100), allowNull:false},
        notice_image: {type: Sequelize.STRING(250), allowNull: true},
        company_info: {type:Sequelize.TEXT, allowNull: false},
        company_channel: {type: Sequelize.STRING(200)},
        job_duty: {type: Sequelize.STRING(100)},
        employ_type: {type: Sequelize.STRING(100)},
        career: {type: Sequelize.STRING(100)},
        company_size: {type: Sequelize.STRING(100)},
        job_sector: {type: Sequelize.STRING(100)},
        notice_date : {type: Sequelize.DATEONLY, allowNull: false, defaultValue: Sequelize.NOW},
        company_location: {type: Sequelize.STRING(100)},
        position_info: {type: Sequelize.TEXT, allowNull:false},
        main_work: {type: Sequelize.TEXT,allowNull:false},
        job_qualify: {type: Sequelize.TEXT, allowNull:false},
        job_prefer: {type: Sequelize.TEXT},
        job_welfare: {type: Sequelize.TEXT, allowNull:false},
        company_communication:{type: Sequelize.TEXT, allowNull: false},
        company_culture: {type: Sequelize.TEXT, allowNull:false},
        company_people: {type: Sequelize.TEXT, allowNull:false},
        next_career:{type: Sequelize.TEXT},
        notice_process: {type: Sequelize.TEXT, allowNull: false},
        is_resume: {type: Sequelize.INTEGER(1), defaultValue: 0},
        resume_file: {type: Sequelize.STRING(200)},
        is_portfolio: {type: Sequelize.INTEGER(1), defaultValue: 0},
        main_video: {type: Sequelize.STRING(200)},
        notice_interview: {type: Sequelize.TEXT},
        is_active: {type: Sequelize.INTEGER(1), defaultValue: 0},
    });

    notice_list.associate = function(models)
    {
        models.notice_list.hasMany(models.notice_member,{
            foreignKey: 'notice_number',
            onDelete: 'cascade',
        })
    }

    return notice_list;
}