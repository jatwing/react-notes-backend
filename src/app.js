require('dotenv').config();
const express = require('express');
const getDatabase = require('./mongdb');

const app = express();

if (require.main === module) {
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}.`);
  });
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/author', async (req, res) => {
  const database = await getDatabase();
  if (database instanceof Error) {
    res.status(500).send(database.toString());
    return;
  }
  const author = await database.collection('authors').findOne({
    name: 'jatwing',
  });
  res.send(author);
});

module.exports = app;
