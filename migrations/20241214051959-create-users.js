"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "users",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        guid: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
        },
        name: {
          type: Sequelize.STRING,
        },
        username: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        role: {
          type: Sequelize.STRING,
        },
        status: {
          type: Sequelize.STRING,
          defaultValue: "active",
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
          defaultValue: Sequelize.DataTypes.NOW(),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.DataTypes.NOW(),
        },
      },
      {
        timestamps: true,
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
