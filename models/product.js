const { ObjectId } = require('mongodb')
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
    const collection = db.collection('products')
    const result = await collection.insertOne(this)
    console.log('result: ', result)

    return result
  }

  static async updateOne(id, values) {
    const db = getDB()
    const collection = db.collection('products')

    return await collection.updateOne({ _id: ObjectId(id) }, { $set: values })
  }

  static async fetchAll() {
    const db = getDB()
    const collection = db.collection('products')

    return await collection.find({}).toArray()
  }

  static async fetchById(id) {
    const db = getDB()
    const collection = db.collection('products')
    const result = await collection.findOne({ _id: new ObjectId(id) })

    return result
  }

  static async deleteOne(id) {
    const db = getDB()
    const collection = db.collection('products')
    const result = await collection.deleteOne({ _id: new ObjectId(id) })

    return result
  }
}

module.exports = Product
// const intersectionBy = require('lodash/intersectionBy')

//   static async findByIDs(ids) {
//     const products = await this.fetchAll()

//     return intersectionBy(products, ids, 'id')
//   }
