const { getDB } = require('../utils/db')

class Product {
  constructor({ title, description, image_url, price }) {
    this.title = title
    this.description = description
    this.image_url = image_url
    this.price = price
  }

  async save() {
    console.log('saving the product...')
    const db = getDB()
    const result = await db.collection('products').insertOne(this)
    console.log('result: ', result)

    return result
  }

  static async getAll() {
    const db = getDB()
    const collection = db.collection('products')

    return await collection.find({}).toArray()
  }
}

module.exports = Product
// const intersectionBy = require('lodash/intersectionBy')

//   static async findByIDs(ids) {
//     const products = await this.getAll()

//     return intersectionBy(products, ids, 'id')
//   }
