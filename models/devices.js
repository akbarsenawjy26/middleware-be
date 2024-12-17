"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class devices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, {
        foreignKey: "userId",
      });
      this.belongsTo(models.tenants, {
        foreignKey: "tenantId",
      });
      this.belongsTo(models.projects, {
        foreignKey: "projectId",
      });
      this.belongsTo(models.types, {
        foreignKey: "typeId",
      });
    }
  }
  devices.init(
    {
      guid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      device_sn: DataTypes.STRING,
      device_name: DataTypes.STRING,
      device_location: DataTypes.STRING,
      status: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      tenantId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
      typeId: DataTypes.INTEGER,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
      createdBy: DataTypes.DATE,
      updatedBy: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "devices",
      timestamps: true,
    }
  );
  return devices;
};
