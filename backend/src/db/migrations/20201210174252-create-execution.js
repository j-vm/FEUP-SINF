"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Executions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      processId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Processes",
          key: "id",
          as: "processId",
        },
      },
      stepAt: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      info: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      finished: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      done: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Executions");
  },
};
