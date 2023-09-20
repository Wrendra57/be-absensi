"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WorkDate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.WorkDate.hasMany(models.Absensi, {
        foreignKey: "id",
      });
    }
  }
  WorkDate.init(
    {
      date: DataTypes.BIGINT,
      tanggal: DataTypes.STRING,
      jumlah: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "WorkDate",
    }
  );
  return WorkDate;
};
