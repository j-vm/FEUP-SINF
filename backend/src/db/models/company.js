'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.belongsToMany(models.Product, {
        through: models.CompanyProduct,
      })
    }
  };
  Company.init({
    name: DataTypes.STRING,
    tenant: DataTypes.STRING,
    clientId: DataTypes.INTEGER,
    clientSecret: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
    underscored: true,
  });
  return Company;
};