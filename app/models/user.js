"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Absensi, {
        foreignKey: "uuid",
      });
    }
  }
  User.init(
    {
      id: { type: DataTypes.BIGINT, autoIncrement: true },
      uuid: { type: DataTypes.STRING, primaryKey: true },
      email: { type: DataTypes.STRING, unique: true },
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      is_enabled: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
