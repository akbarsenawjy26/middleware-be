const { DataTypes } = require("sequelize");
const sequelizeConnection = require("../../config/auth_database_config");
const userModels = require("./user_models");

const ApiKey = sequelizeConnection.define(
  "apikey_management",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    expires_at: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "apikey_management",
    timestamps: true,
  }
);

userModels.hasMany(ApiKey);
ApiKey.belongsTo(userModels, { foreignKey: "userId" });

module.exports = ApiKey;
