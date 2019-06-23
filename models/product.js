const { query } = require('../utils/db')

const intersectionBy = require('lodash/intersectionBy')

module.exports = class Product {
  constructor({ title, description, imageUrl, price }) {
    this.title = title
    this.description = description
    this.imageUrl = imageUrl
    this.price = price
  }

  async save() {
    try {
      const queryObj = {
        text: 'INSERT INTO products(title, description, image_url, price) VALUES($1, $2, $3, $4) RETURNING *',
        values: [this.title, this.description, this.imageUrl, this.price],
      }

      return await query(queryObj)
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
      const queryObj = {
        text: 'SELECT * FROM products WHERE product_id = $1',
        values: [id],
      }

      const { rows } = await query(queryObj)
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

  static async update(id, values) {
    try {
      const queryObj = {
        text:
          'UPDATE products SET title = $2, description = $3, image_url = $4, price = $5 WHERE product_id = $1 RETURNING product_id, title, description, image_url, price;',
        values: [id, values.title, values.description, values.image_url, values.price],
      }

      return await query(queryObj)
    } catch (err) {
      console.error(err)
      return err
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
