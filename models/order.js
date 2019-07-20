const mongoose = require('mongoosej')

const orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
})

module.exports = mongoose.model('Order', orderSchema)
