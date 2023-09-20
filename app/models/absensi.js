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
      models.Absensi.belongsTo(models.WorkDate, {
        foreignKey: "id",
      });
    }
  }
  Absensi.init(
    {
      uuid: DataTypes.STRING,
      check_in: DataTypes.STRING,
      check_out: DataTypes.STRING,
      statusCheckin: DataTypes.BOOLEAN,
      statusCheckout: DataTypes.BOOLEAN,
      keterangan: DataTypes.STRING,
      idAbsent: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Absensi",
    }
  );
  return Absensi;
};
