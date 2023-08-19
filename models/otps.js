'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Otps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Otps.init({
    email_address: DataTypes.STRING,
    otp_type: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Otps',
  });
  return Otps;
};