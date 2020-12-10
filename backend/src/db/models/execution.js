"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Execution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Execution.belongsTo(models.Process, {
        foreignKey: "processId",
        onDelete: "CASCADE",
      });
    }
  }
  Execution.init(
    {
      processId: DataTypes.INTEGER,
      stepAt: DataTypes.INTEGER,
      finished: DataTypes.BOOLEAN,
      done: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Execution",
    }
  );
  return Execution;
};
