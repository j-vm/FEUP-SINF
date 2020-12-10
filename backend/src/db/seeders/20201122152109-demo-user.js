"use strict";
const SecurePassword = require("secure-password");
const pwd = new SecurePassword();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hash = await pwd.hash(Buffer.from("intercompany"));
    const hashedPassword = hash.toString("base64");

    const date = new Date();

    await queryInterface.bulkInsert("Users", [
      {
        username: "sinf",
        hashedPassword,
        createdAt: date,
        updatedAt: date,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", {
      username: "sinf",
    });
  },
};
