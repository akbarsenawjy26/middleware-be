const { DataTypes } = require("sequelize");
const sequelizeConnection = require("../../config/auth_database_config");
const userModels = require("./user_models");

const Project = sequelizeConnection.define(
  "project_management",
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
    vendor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    identity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 4],
      },
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        len: [3, 250],
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
    tableName: "project_management",
    timestamps: true,
    hooks: {
      beforeCreate: (project, options) => {
        // Set default value for 'topic' if it's not provided
        if (!project.topic) {
          project.topic = `${project.vendor}/${project.version}/${project.identity}/#`;
        }
      },
      beforeUpdate: (project, options) => {
        // Set default value for 'topic' if it's not provided during update
        if (!project.topic) {
          project.topic = `${project.vendor}/${project.version}/${project.identity}/#`;
        }
      },
    },
  }
);

userModels.hasMany(Project);
Project.belongsTo(userModels, { foreignKey: "userId" });

module.exports = Project;
