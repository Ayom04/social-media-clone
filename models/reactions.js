'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Reactions.belongsTo(models.Posts, { foreignKey: 'post_id' });
      models.Reactions.belongsTo(models.Users, { foreignKey: 'user_id' });
    }
  }
  Reactions.init({
    reaction_id: DataTypes.UUID,
    post_id: DataTypes.UUID,
    user_id: DataTypes.UUID,
    reaction: DataTypes.ENUM('like', 'dislike', 'love', 'haha')
  }, {
    sequelize,
    modelName: 'Reactions',
  });
  return Reactions;
};