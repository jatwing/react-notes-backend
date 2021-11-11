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
    id: 'jatwing',
  });
  res.send(author);
});

app.get('/notifications', async (req, res) => {
  const database = await getDatabase();
  if (database instanceof Error) {
    res.status(500).send(database.toString());
    return;
  }
  const notifications = await database
    .collection('notifications')
    .find({
      isActive: true,
    })
    .toArray();
  res.send(notifications);
});

app.get('/project', async (req, res) => {
  const database = await getDatabase();
  if (database instanceof Error) {
    res.status(500).send(database.toString());
    return;
  }
  console.log('#')
  const project = await database.collection('projects').findOne({
    id: 'react-notes',
  });
  console.log('#')
  console.log(project)
  res.send(project);
});

app.get('/rankings', async (req, res) => {
  const database = await getDatabase();
  if (database instanceof Error) {
    res.status(500).send(database.toString());
    return;
  }
  const rankings = await database.collection('rankings').find().toArray();
  res.send(rankings);
});

app.get('/translations', async (req, res) => {
  const database = await getDatabase();
  if (database instanceof Error) {
    res.status(500).send(database.toString());
    return;
  }
  const translations = await database
    .collection('translations')
    .find()
    .toArray();
  res.send(translations);
});

module.exports = app;
