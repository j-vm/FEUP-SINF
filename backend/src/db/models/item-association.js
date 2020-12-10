"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ItemAssociation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemAssociation.init(
    {
      company1Id: DataTypes.STRING,
      company2Id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ItemAssociation",
    }
  );
  return ItemAssociation;
};
