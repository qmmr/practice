const fs = require('fs').promises
const path = require('path')
const { query } = require('../utils/db')

const intersectionBy = require('lodash/intersectionBy')
const uuidV4 = require('uuid/v4')

const FILE_PATH = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')

module.exports = class Product {
  constructor({ title, description, imageUrl, price }) {
    this.product_id = uuidV4()
    this.title = title
    this.description = description
    this.imageUrl = imageUrl
    this.price = price
  }

  async save() {
    try {
      const queryObject = {
        text: 'INSERT INTO products(title, description, image_url, price) VALUES($1, $2, $3, $4) RETURNING *',
        values: [this.title, this.description, this.imageUrl, this.price],
      }

      return await query(queryObject)
    } catch (err) {
      console.error(err)
    }
  }

  static async getAll() {
    try {
      const { rows } = await query('SELECT * FROM products')

      return rows
    } catch (err) {
      console.error(err)
      // In case of an error, at least return empty array
      return []
    }
  }

  static async findById(id) {
    try {
      const queryObject = {
        text: 'SELECT * FROM products WHERE product_id = $1',
        values: [id],
      }

      const { rows } = await query(queryObject)
      const product = rows[0]

      return product
    } catch (err) {
      console.error(err)
    }
  }

  static async findByIDs(ids) {
    const products = await this.getAll()

    return intersectionBy(products, ids, 'id')
  }

  // TODO: Replace with update values in the DB
  static async update(id, values) {
    const products = await this.getAll()
    const idx = products.findIndex(product => product.id === id)

    // If we found product to edit
    if (idx !== -1) {
      // Update all the values of found product
      products[idx] = { ...products[idx], ...values }

      try {
        // Save the file with updated products
        await fs.writeFile(FILE_PATH, JSON.stringify(products), 'utf8')

        return true
      } catch (err) {
        console.error(err)
        return err
      }
    } else {
      console.error(`Could not find the product with id: ${id}`)
    }
  }

  static async delete(id) {
    try {
      return await query({
        text: `DELETE FROM products WHERE product_id = $1`,
        values: [id],
      })
    } catch (err) {
      console.error(err)
      return err
    }
  }
}
