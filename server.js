const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.get('/', (req, res) => {
  res.send(process.env.SECRET_KEY);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});