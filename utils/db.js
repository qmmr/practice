const { MongoClient } = require('mongodb')

const { DB_USER = 'rumoren', DB_PASSWORD, DB_NAME } = process.env
const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@node-complete-esmpc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

let _CLIENT = null
let _DB = null

const connect = async () => {
  _CLIENT = await MongoClient.connect(MONGO_URI, { useNewUrlParser: true })
  _DB = _CLIENT.db()

  return _CLIENT
}

const getDB = () => {
  if (_DB) {
    return _DB
  }

  throw new Error('No database connection!')
}

module.exports = {
  connect,
  getDB,
}
