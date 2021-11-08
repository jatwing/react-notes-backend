const { MongoClient } = require("mongodb");
require("dotenv").config();

const getDatabase = async () => {
  const client = await MongoClient.connect(process.env.MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return client.db(process.env.DATABASE_NAME);
}

module.exports = getDatabase;
