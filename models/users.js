"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Users.hasMany(models.Posts, { foreignKey: "user_id" });
      models.Users.hasMany(models.Comments, { foreignKey: "user_id" });
      models.Users.hasOne(models.Reactions, { foreignKey: "user_id" });
    }
  }
  Users.init(
    {
      user_id: DataTypes.UUID,
      surname: DataTypes.STRING,
      othernames: DataTypes.STRING,
      email_address: DataTypes.STRING,
      phone: DataTypes.STRING,
      user_name: DataTypes.STRING,
      gender: DataTypes.ENUM("male", "female", "others"),
      date_of_birth: DataTypes.DATE,
      about_me: DataTypes.TEXT,
      occupation: DataTypes.STRING,
      is_deleted: DataTypes.BOOLEAN,
      is_verified: DataTypes.BOOLEAN,
      password_hash: DataTypes.STRING,
      password_salt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
