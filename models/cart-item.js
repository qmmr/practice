const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

class CartItem extends Sequelize.Model {}
CartItem.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    quantity: {
      type: Sequelize.NUMERIC,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'cartItem', underscored: true }
)

module.exports = CartItem
