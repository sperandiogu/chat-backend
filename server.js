const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

let messages = [];

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  const message = req.body;
  messages.push(message);
  res.status(201).json(message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
