const express = require("express");
const getDatabase = require("./mongo-client");

const app = express();

app.listen(3011, () => {
  console.log("listening on 3011");
});

app.get("/", async (req, res) => {
  console.log("test");

  const test = await getDatabase().collection("author").find().toArray();

  console.log(test);

  res.send("Hello World 122");
});

module.exports = app;
