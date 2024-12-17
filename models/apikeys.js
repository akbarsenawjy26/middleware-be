"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class apikeys extends Model {
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
      this.belongsTo(models.projects, {
        foreignKey: "projectId",
      });
    }
  }
  apikeys.init(
    {
      guid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      api_key: DataTypes.STRING,
      expires_at: DataTypes.DATE,
      note: DataTypes.STRING,
      status: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "apikeys",
    }
  );
  return apikeys;
};
