"use strict";
const { Model } = require("sequelize");
const SecurePassword = require("secure-password");
const pwd = new SecurePassword();

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      hashedPassword: {
        type: DataTypes.TEXT,
        get() {
          const raw = this.getDataValue("hashedPassword");
          return Buffer.from(raw, "base64");
        },
        set(value) {
          if (value instanceof Buffer) {
            this.setDataValue("hashedPassword", value.toString("base64"));
          } else {
            // assumed to be a raw password. should not be called as such, only last resort
            const hashed = pwd.hashSync().toString("base64");
            this.setDataValue("hashedPassword", hashed);
          }
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
