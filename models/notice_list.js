const { Sequelize } = require('sequelize');

module.exports = function(sequelize, dataTypes){
    const notice_list = sequelize.define('notice_list', {
        number: {type: Sequelize.INTEGER(11), primaryKey: true, autoIncrement: true},
        notice_title: {type: Sequelize.STRING(200), allowNull: false},
        notice_image: {type: Sequelize.STRING(250), allowNull: true},
        notice_info: {type:Sequelize.TEXT, allowNull: false},
        notice_channel: {type: Sequelize.STRING(200)},
        notice_position: {type: Sequelize.TEXT, allowNull:false},
        notice_date : {type: Sequelize.DATEONLY, allowNull: false, defaultValue: Sequelize.NOW},
        notice_interview: {type: Sequelize.TEXT},
        is_active: {type: Sequelize.INTEGER(1), defaultValue: 0},
    });

    return notice_list;
}