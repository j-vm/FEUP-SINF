"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Process extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Process.hasMany(models.ProcessStep, { foreignKey: "processId" });
      Process.hasMany(models.Execution, { foreignKey: "processId" });
    }
  }
  Process.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Process",
    }
  );
  return Process;
};
