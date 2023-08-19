'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      sn: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      user_id:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      othernames: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email_address:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey:true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      gender:{
        type: Sequelize.ENUM,
        values: ['male', 'female', 'others'],
        allowNull: false
      },
      date_of_birth:{
        type: Sequelize.DATE,
        allowNull: false
      },
      about_me:{
        type: Sequelize.TEXT,
        allowNull: true
      },
      occupation:{
        type:Sequelize.STRING,
        allowNull: true
      },
      is_deleted:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_verified:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      password_hash:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      password_salt:{
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
