'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CompanyProduct.belongsTo(models.Company, {
        foreignKey: 'company_id',
        onDelete: 'CASCADE'
      });
      CompanyProduct.belongsTo(models.Product, {
        foreignKey: 'product_id',
        onDelete: 'CASCADE'
      })
    }
  };
  CompanyProduct.init({
    sku: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CompanyProduct',
    underscored: true,
  });
  return CompanyProduct;
};