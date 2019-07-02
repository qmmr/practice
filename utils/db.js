const { MongoClient } = require('mongodb')

const { DB_USER = 'rumoren', DB_PASSWORD, DB_NAME } = process.env
const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@node-complete-esmpc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

const connect = async () => {
  const client = await MongoClient.connect(MONGO_URI, { useNewUrlParser: true })

  return client
}

module.exports = connect
