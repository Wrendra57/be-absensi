"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Absensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Absensi.belongsTo(models.User, {
        foreignKey: "uuid",
      });
    }
  }
  Absensi.init(
    {
      uuid: DataTypes.STRING,
      check_in: DataTypes.STRING,
      check_out: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Absensi",
    }
  );
  return Absensi;
};
