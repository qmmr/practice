const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

class Cart extends Sequelize.Model {}
Cart.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  },
  { sequelize, modelName: 'cart', underscored: true }
)

module.exports = Cart
