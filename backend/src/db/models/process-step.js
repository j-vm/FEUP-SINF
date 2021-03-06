"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProcessStep extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProcessStep.belongsTo(models.Process, {
        foreignKey: "processId",
        onDelete: "CASCADE",
      });
    }
  }
  ProcessStep.init(
    {
      order: { type: DataTypes.INTEGER, unique: "processOrder" },
      processId: { type: DataTypes.INTEGER, unique: "processOrder" },
      type: DataTypes.STRING,
      documentType: DataTypes.STRING,
      company: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProcessStep",
    }
  );
  return ProcessStep;
};
