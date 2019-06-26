// const { query } = require('../utils/db')

const Sequelize = require('sequelize')
const sequelize = require('../utils/db')
const Model = Sequelize.Model

class Product extends Model {}
Product.init(
  {
    product_id: {
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
      type: Sequelize.STRING,
      allowNull: false,
    },

    image_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    price: {
      type: Sequelize.NUMERIC,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'product' }
)

module.exports = Product
// const intersectionBy = require('lodash/intersectionBy')

//   static async findByIDs(ids) {
//     const products = await this.getAll()

//     return intersectionBy(products, ids, 'id')
//   }
