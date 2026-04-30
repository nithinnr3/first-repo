const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDb, addGame, getStats } = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

initDb();

const choices = ['stone', 'paper', 'scissor'];
const outcome = {
  stone: { stone: 'tie', paper: 'lose', scissor: 'win' },
  paper: { stone: 'win', paper: 'tie', scissor: 'lose' },
  scissor: { stone: 'lose', paper: 'win', scissor: 'tie' },
};

function resolveWinner(player, computer) {
  const result = outcome[player] && outcome[player][computer];
  if (!result) return 'invalid';
  return result;
}

app.post('/api/play', async (req, res) => {
  const player = String(req.body.player || '').toLowerCase();
  if (!choices.includes(player)) {
    return res.status(400).json({ error: 'Choose stone, paper, or scissor.' });
  }
  const computer = choices[Math.floor(Math.random() * choices.length)];
  const result = resolveWinner(player, computer);
  const record = { player, computer, result, created_at: new Date().toISOString() };
  try {
    await addGame(record);
    res.json({ player, computer, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to save game.' });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to read stats.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Stone Paper Scissor server running on http://localhost:${port}`);
});