'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      comment_id:{
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      post_id: {
        type: Sequelize.UUID,
        references:{
          model: 'Posts',
          key: 'post_id'
        }
      },
      user_id:{
        type: Sequelize.UUID,
        references:{
          model: 'Users',
          key: 'user_id'
        }
      },
      comment: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('Comments');
  }
};