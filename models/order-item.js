const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

class OrderItem extends Sequelize.Model {}
OrderItem.init(
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
  { sequelize, modelName: 'orderItem', underscored: true }
)

module.exports = OrderItem
