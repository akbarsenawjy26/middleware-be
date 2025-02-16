const { DataTypes } = require("sequelize");
const sequelizeConnection = require("../../config/auth_database_config");
const userModels = require("./user_models");
const projectModels = require("./project_models");

const Device = sequelizeConnection.define(
  "device_management",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    guid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    device_sn: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    device_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    device_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    device_location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    createdBy: {
      type: DataTypes.STRING,
      defaultValue: "system",
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    updatedBy: {
      type: DataTypes.STRING,
      defaultValue: "system",
    },
  },
  {
    tableName: "device_management",
    timestamps: true,
  }
);

userModels.hasMany(Device);
projectModels.hasMany(Device);
Device.belongsTo(userModels, { foreignKey: "userId" });
Device.belongsTo(projectModels, { foreignKey: "projectId" });

module.exports = Device;
