'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.Users, { foreignKey: 'user_id' });
      models.Post.hasMany(models.Comments, { foreignKey: 'post_id' });
      models.Post.hasMany(models.Reactions, { foreignKey: 'post_id' });
    }
  }
  Posts.init({
    post_id: DataTypes.UUID,
    user_id: DataTypes.UUID,
    post: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};