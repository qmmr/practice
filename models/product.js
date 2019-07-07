const mongoose = require('mongoose')

const Schema = mongoose.Schema
const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image_url: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

module.exports = mongoose.model('Product', productSchema)

// class Product {
//   constructor({ title, description, image_url, price }) {
//     this.title = title
//     this.description = description
//     this.image_url = image_url
//     this.price = price
//   }

//   async save() {
//     const db = getDB()
//     const collection = db.collection('products')
//     const result = await collection.insertOne(this)

//     return result
//   }

//   static async updateOne(id, values) {
//     const db = getDB()
//     const collection = db.collection('products')

//     return await collection.updateOne({ _id: ObjectId(id) }, { $set: values })
//   }

//   static async fetchAll() {
//     const db = getDB()
//     const collection = db.collection('products')

//     return await collection.find({}).toArray()
//   }

//   static async fetchById(id) {
//     const db = getDB()
//     const collection = db.collection('products')
//     const result = await collection.findOne({ _id: new ObjectId(id) })

//     return result
//   }

//   static async deleteOne(id) {
//     const db = getDB()
//     const collection = db.collection('products')
//     const result = await collection.deleteOne({ _id: new ObjectId(id) })

//     return result
//   }
// }

// module.exports = Product
// const intersectionBy = require('lodash/intersectionBy')

//   static async findByIDs(ids) {
//     const products = await this.fetchAll()

//     return intersectionBy(products, ids, 'id')
//   }
