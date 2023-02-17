const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.json());

app.post('/api/login', (req, res) => {
  const email = req.body.email,
        password = req.body.password;
  
  // Need to validate email and pw
  console.log(email, password);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});