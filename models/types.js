"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class types extends Model {
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
      this.hasMany(models.devices, {
        foreignKey: "typeId",
      });
    }
  }
  types.init(
    {
      guid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      name_type: DataTypes.STRING,
      status: DataTypes.STRING,
      filter: DataTypes.JSON,
      userId: DataTypes.INTEGER,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "types",
      timestamps: true,
    }
  );
  return types;
};
