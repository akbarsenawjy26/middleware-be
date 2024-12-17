"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.tenants, {
        foreignKey: "userId",
      });
      this.hasMany(models.types, {
        foreignKey: "userId",
      });
      this.hasMany(models.projects, {
        foreignKey: "userId",
      });
      this.hasMany(models.apikeys, {
        foreignKey: "userId",
      });
      this.hasMany(models.devices, {
        foreignKey: "userId",
      });
    }
  }
  users.init(
    {
      guid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      status: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
      timestamps: true,
    }
  );
  return users;
};
