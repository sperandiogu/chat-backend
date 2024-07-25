const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8080;

const GEMINI_API_KEY = 'AIzaSyAH4CcTxGeVK62ilMkspN9Neqr4-tkgv0w';

app.use(bodyParser.json());
app.use(cors({
  origin: '*', // Ajuste isso conforme necessário para seu ambiente de produção
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization'
}));

let messages = [];

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', async (req, res) => {
  const message = req.body;
  messages.push(message);
  res.status(201).json(message);

  try {
    console.log('Enviando mensagem para a API do Gemini:', message.text);
    const geminiResponse = await axios.post('https://api.gemini.com/v1/chat', {
      prompt: message.text
    }, {
      headers: {
        'Authorization': `Bearer ${GEMINI_API_KEY}`
      }
    });

    console.log('Resposta da API do Gemini:', geminiResponse.data);
    const botMessage = { sender: 'bot', text: geminiResponse.data.reply };
    messages.push(botMessage);
    res.status(201).json(botMessage);
  } catch (error) {
    console.error('Erro ao chamar a API do Gemini:', error.message);
    res.status(500).json({ error: 'Erro ao chamar a API do Gemini' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
