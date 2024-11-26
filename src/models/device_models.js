const { DataTypes } = require("sequelize");
const sequelizeConnection = require("../../config/auth_database_config");
const userModels = require("./user_models");

const Device = sequelizeConnection.define(
  "device_management",
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
    device_name: {
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
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "device_management",
    timestamps: true,
  }
);

userModels.hasMany(Device);
Device.belongsTo(userModels, { foreignKey: "userId" });

module.exports = Device;
