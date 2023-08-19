'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comments.belongsTo(models.Post, { foreignKey: 'post_id' });
      models.Comments.belongsTo(models.Users, { foreignKey: 'user_id' });
    }
  }
  Comments.init({
    post_id: DataTypes.UUID,
    user_id:DataTypes.UUID,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};