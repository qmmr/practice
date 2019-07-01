const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

class Product extends Sequelize.Model {}
Product.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },

    image_url: {
      type: Sequelize.TEXT,
      allowNull: false,
    },

    price: {
      type: Sequelize.NUMERIC,
      allowNull: false,
    },

    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },

    updatedAt: {
      field: 'updated_at',
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  { sequelize, modelName: 'product', underscored: true }
)

module.exports = Product
// const intersectionBy = require('lodash/intersectionBy')

//   static async findByIDs(ids) {
//     const products = await this.getAll()

//     return intersectionBy(products, ids, 'id')
//   }
