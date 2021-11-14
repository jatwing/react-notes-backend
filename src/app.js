require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getDatabase = require('./mongdb');

const app = express();

app.use(
  cors({
    origin: process.env.STAGE === 'production' ? process.env.WEB_ORIGIN : '*',
    methods: process.env.ALLOWED_METHODS,
    credentials: process.env.STAGE === 'production',
    optionsSuccessStatus: 200,
  }),
);

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

app.get('/notifications', cors(), async (req, res) => {
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
  const project = await database.collection('projects').findOne({
    id: 'react-notes',
  });
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
