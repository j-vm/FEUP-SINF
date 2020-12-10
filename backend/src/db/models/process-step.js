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
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  ProcessStep.init(
    {
      order: DataTypes.INTEGER,
      processId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      documentType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProcessStep",
      underscored: true,
    }
  );
  return ProcessStep;
};
