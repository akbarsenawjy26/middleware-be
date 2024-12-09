const { DataTypes } = require("sequelize");
const sequelizeConnection = require("../../config/auth_database_config");
const userModels = require("./user_models");
const projectModels = require("./project_models");

const ApiKey = sequelizeConnection.define(
  "apikey_management",
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
    api_key: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    expires_at: {
      type: DataTypes.DATE,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "apikey_management",
    timestamps: true,
  }
);

userModels.hasMany(ApiKey);
projectModels.hasMany(ApiKey);
ApiKey.belongsTo(userModels, { foreignKey: "userId" });
ApiKey.belongsTo(projectModels, { foreignKey: "projectId" });

module.exports = ApiKey;
