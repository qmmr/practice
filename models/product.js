const fs = require('fs').promises
const path = require('path')

const FILE_PATH = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')

module.exports = class Product {
  constructor({ title }) {
    this.title = title
  }

  async save() {
    try {
      // Check if there are products in products.json
      const fileContent = await fs.readFile(FILE_PATH, 'utf8')

      if (fileContent !== '') {
        // Parse, add new product and save back to products.json
        const parsedProducts = JSON.parse(fileContent)
        parsedProducts.push(this)
        await fs.writeFile(FILE_PATH, JSON.stringify(parsedProducts), 'utf8')
      } else {
        // If there were no products, save the first product
        await fs.writeFile(FILE_PATH, JSON.stringify([ this ]), 'utf8')
      }
    } catch (err) {
      console.error(err)
    }
  }

  static async getAll() {
    try {
      // Read content of products.json
      const fileContent = await fs.readFile(FILE_PATH, 'utf8')

      // Check if there are products saved in products.json
      if (fileContent !== '') {
        return JSON.parse(fileContent)
      }

      // Otherwise return empty array
      return []
    } catch (err) {
      // If file does not exist throw error
      throw err
    }
  }
}
