const fs = require('fs').promises
const path = require('path')

const FILE_PATH = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')

module.exports = class Product {
  constructor({ title, description, imageUrl, price }) {
    this.title = title
    this.description = description
    this.imageUrl = imageUrl
    this.price = price
  }

  async save() {
    try {
      let products = []
      // Get products from products.json
      const fileContents = await fs.readFile(FILE_PATH, 'utf8')
      products = JSON.parse(fileContents)
      // Add the new product
      products.push(this)
      // Save the file
      await fs.writeFile(FILE_PATH, JSON.stringify(products), 'utf8')
    } catch (err) {
      console.error(err)
    }

    // TODO: Check if this is needed?
    return this
  }

  static async getAll() {
    try {
      // Read content of products.json
      const fileContents = await fs.readFile(FILE_PATH, 'utf8')

      return JSON.parse(fileContents)
    } catch (err) {
      console.error(err)
      // In case of an error, at least return empty array
      return []
    }
  }
}
