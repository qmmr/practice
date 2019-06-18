const fs = require('fs').promises
const path = require('path')

const FILE_PATH = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json')

module.exports = class Cart {
  static async add(id) {
    let products = []
    let productToSave = { id, quantity: 1 }

    // Retrieve contents of the cart.json
    try {
      const fileContent = await fs.readFile(FILE_PATH, 'utf-8')
      products = JSON.parse(fileContent)
      console.log('products: ', products)

      // Check if product with this id is already in products array
      let foundIndex = products.findIndex(product => product.id === id)
      // If found update it's quantity
      if (foundIndex !== -1) {
        products[foundIndex].quantity = products[foundIndex].quantity + 1
      } else {
        // If not found simply push the new product to the cart
        products.push(productToSave)
      }

      // Save the cart to cart.json
      try {
        console.log('saving file...')
        console.log(JSON.stringify(products))
        await fs.writeFile(FILE_PATH, JSON.stringify(products), 'utf-8')
      } catch (err) {
        console.error(err)
        throw err
      }
    } catch (err) {
      // TODO: How to report error with problems when reading from file? 🤔
      console.error(err)
    }
  }

  /** Return all products in the cart */
  static async getProducts() {
    let products = []
    try {
      const fileContent = await fs.readFile(FILE_PATH, 'utf-8')
      products = JSON.parse(fileContent)
      console.log('getProducts: ', products)

      return products
    } catch (err) {
      console.log(err)
      // TODO: How to report error with problems when reading from file? 🤔
    }
  }
}
