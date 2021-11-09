const express = require('express');
const getDatabase = require('./mongobd');

const app = express();

app.listen(3011, () => {
  console.log('listening on 3011');
});

getDatabase((database) => {
  app.get('/', async (req, res) => {
    const test = await database.collection('author').find().toArray();
    res.send(test);
  });
});

module.exports = app;
