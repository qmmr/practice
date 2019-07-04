const { ObjectId } = require('mongodb')

const { getDB } = require('../utils/db')

class User {
  constructor({ _id, name, email, cart = { products: [] } }) {
    this._id = _id
    this.name = name
    this.email = email
    this.cart = cart
  }

  async addToCart(productId) {
    const db = getDB()
    const collection = db.collection('users')

    // Check if productId is in the cart
    const foundIndex = this.cart.products.findIndex(p => p._id.toString() === productId)

    console.log('foundIndex: ', foundIndex)
    if (foundIndex === -1) {
      // Add new product
      console.log('add new product...')
      this.cart = {
        products: [
          ...this.cart.products,
          {
            _id: new ObjectId(productId),
            quantity: 1,
          },
        ],
      }
    } else {
      // Update quantity
      this.cart.products[foundIndex].quantity = this.cart.products[foundIndex].quantity + 1
    }

    // console.log('productId: ', productId)
    // console.log('this.cart: ', this.cart)
    // console.log('this._id: ', this._id)

    // Save the cart
    const { modifiedCount } = await this.saveCart()

    return modifiedCount
  }

  async getCart() {
    const db = getDB()
    const collection = db.collection('products')
    // console.log('this.cart: ', this.cart)
    const productIds = this.cart.products.map(p => new ObjectId(p._id))
    // console.log('productIds: ', productIds)
    const products = await collection.find({ _id: { $in: productIds } }).toArray()
    products.forEach(product => {
      // console.log('product without quantity: ', product)
      product.quantity = this.cart.products.find(p => p._id.toString() === product._id.toString()).quantity
      // console.log('product with quantity: ', product)

      return product
    })
    // console.log('products: ', products)

    return {
      products,
    }
  }

  async saveCart(cart = this.cart) {
    const db = getDB()
    const collection = db.collection('users')

    // Save the cart
    const result = await collection.updateOne({ _id: new ObjectId(this._id) }, { $set: { cart } })
    console.log('saveCart -> result: ', Object.keys(result))
    console.log('saveCart -> result.modifiedCount: ', result.modifiedCount)

    return result
  }

  async removeFromCart(productId) {
    // Find the product in the cart and remove it
    this.cart.products = this.cart.products.filter(product => product._id.toString() !== productId)

    return await this.saveCart()
  }
}

module.exports = User
