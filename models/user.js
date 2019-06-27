const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

const Model = Sequelize.Model

class User extends Model {}
User.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    email: {
      type: Sequelize.STRING,
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
  { sequelize, modelName: 'user', underscored: true }
)

module.exports = User
