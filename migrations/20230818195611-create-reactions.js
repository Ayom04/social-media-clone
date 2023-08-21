'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      reaction_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
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
      reaction:{
        type: Sequelize.ENUM,
        values: ['like', 'dislike', 'love', 'haha'],
       allowNull: true
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
    await queryInterface.dropTable('Reactions');
  }
};