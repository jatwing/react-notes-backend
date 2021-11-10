const express = require('express');
const getDatabase = require('./mongdb');

const app = express();

app.listen(3011, () => {
  console.log('listening on 3011');
});

app.get('/test', (req, res) => {
  res.send('test');
});

app.get('/author', async (req, res) => {
  const database = await getDatabase();
  const author = await database
    .collection('author')
    .findOne({
      name: 'jatwing',
    })
    .toArray();
  res.send(author);
});

module.exports = app;
