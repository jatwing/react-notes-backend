const { MongoClient } = require('mongodb');

const getDatabase = async () => {
  try {
    const client = await MongoClient.connect(
      process.env.MONGODB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    return client.db(process.env.DATABASE_NAME);
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = getDatabase;
