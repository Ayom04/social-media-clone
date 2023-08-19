'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Otps', {
      sn: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      otp_id:{
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      email_address: {
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model: 'Users',
          key: 'email_address'
        }
      },
      otp_type: {
        type: Sequelize.BOOLEAN,
        values: ['REGISTRATION', 'FORGOT_PASSWORD'],
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
    await queryInterface.dropTable('Otps');
  }
};