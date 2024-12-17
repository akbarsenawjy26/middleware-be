"use strict";

const { UUIDV4 } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "devices",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        guid: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
        },
        device_sn: {
          type: Sequelize.STRING,
        },
        device_name: {
          type: Sequelize.STRING,
        },
        device_location: {
          type: Sequelize.STRING,
        },
        status: {
          type: Sequelize.STRING,
          defaultValue: "active",
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        tenantId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "tenants",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        projectId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "projects",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        typeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "types",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        createdBy: {
          type: Sequelize.STRING,
          defaultValue: "system",
        },
        updatedBy: {
          type: Sequelize.STRING,
          defaultValue: "system",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        timestamps: true,
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("devices");
  },
};
