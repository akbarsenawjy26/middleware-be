"use strict";

const { UUIDV4 } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "projects",
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
        vendor: {
          type: Sequelize.STRING,
        },
        version: {
          type: Sequelize.STRING,
        },
        project_name: {
          type: Sequelize.STRING,
        },
        identity: {
          type: Sequelize.STRING,
        },
        topic: {
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
    await queryInterface.dropTable("projects");
  },
};
