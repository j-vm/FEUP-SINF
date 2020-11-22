"use strict";
const SecurePassword = require("secure-password");
const pwd = new SecurePassword();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hash = await pwd.hash(Buffer.from("intercompany"));
    const hashed_password = hash.toString("base64");

    const date = new Date();

    await queryInterface.bulkInsert("users", [
      {
        username: "sinf",
        hashed_password,
        created_at: date,
        updated_at: date,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", {
      username: "sinf",
    });
  },
};
