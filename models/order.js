const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

class Order extends Sequelize.Model {}
Order.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  },
  { sequelize, modelName: 'order', underscored: true }
)

module.exports = Order
