"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tenants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, {
        foreignKey: "userId",
        as: "user",
      });
      this.hasMany(models.projects, {
        foreignKey: "tenantId",
      });
      this.hasMany(models.devices, {
        foreignKey: "tenantId",
      });
    }
  }
  tenants.init(
    {
      guid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name_tenant: DataTypes.STRING,
      status: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tenants",
      timestamps: true,
    }
  );
  return tenants;
};
