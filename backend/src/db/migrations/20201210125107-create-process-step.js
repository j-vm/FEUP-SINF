"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ProcessSteps", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order: {
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
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      documentType: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("ProcessSteps");
  },
};
