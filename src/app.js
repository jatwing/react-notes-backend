const express = require('express');
const { getDatabase } = require("./mongdb");

const app = express();

app.listen(3011, () => {
  console.log('listening on 3011');
});


app.get('/test', (req, res) => {
  res.send('test');
})


app.get('/test2', async (req, res) => {
  const database = await getDatabase();
  const test2 = await database.collection('author').find().toArray();
  res.send(test2);
})

module.exports = app;
