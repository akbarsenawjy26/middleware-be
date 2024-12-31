"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
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
      this.hasMany(models.apikeys, {
        foreignKey: "projectId",
      });
      this.hasMany(models.devices, {
        foreignKey: "projectId",
      });
    }
  }
  projects.init(
    {
      guid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      vendor: DataTypes.STRING,
      version: DataTypes.STRING,
      project_name: DataTypes.STRING,
      identity: DataTypes.STRING,
      topic: DataTypes.STRING,
      status: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      tenantId: DataTypes.INTEGER,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "projects",
      timestamps: true,
      hooks: {
        beforeCreate: (project, options) => {
          if (!project.topic) {
            project.topic = `iot-${project.guid.slice(0, 8)}/${project.vendor}/${project.version}/${project.identity}/#`;
          }
        },
        beforeUpdate: (project, options) => {
          if (project.topic === null) {
            project.topic = `${project.vendor}/${project.version}/${project.identity}/#`;
          }
        },
      },
    }
  );
  return projects;
};
