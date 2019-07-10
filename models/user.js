const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cart: {
    products: [
      {
        product: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
})

userSchema.methods.addToCart = function(productId) {
  // Check if productId is in the cart
  const foundIndex = this.cart.products.findIndex(p => p.product._id.toString() === productId.toString())

  if (foundIndex === -1) {
    // Add new product
    this.cart = {
      products: [
        ...this.cart.products,
        {
          product: productId,
          quantity: 1,
        },
      ],
    }
  } else {
    // Update quantity
    this.cart.products[foundIndex].quantity = this.cart.products[foundIndex].quantity + 1
  }

  // Save the model
  return this.save()
}

userSchema.methods.removeFromCart = function(id) {
  this.cart.products = this.cart.products.filter(p => p._id.toString() !== id)

  // Save the model
  this.save()
}

module.exports = mongoose.model('User', userSchema)
