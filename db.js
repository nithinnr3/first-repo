const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const dbPath = path.join(__dirname, 'game.db');

async function openDb() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}

async function initDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      player TEXT NOT NULL,
      computer TEXT NOT NULL,
      result TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
  await db.close();
}

async function addGame(game) {
  const db = await openDb();
  await db.run(
    'INSERT INTO games (player, computer, result, created_at) VALUES (?, ?, ?, ?)',
    game.player,
    game.computer,
    game.result,
    game.created_at,
  );
  await db.close();
}

async function getStats() {
  const db = await openDb();
  const rows = await db.all('SELECT result, COUNT(*) AS count FROM games GROUP BY result');
  await db.close();
  const stats = { win: 0, lose: 0, tie: 0, total: 0 };
  for (const row of rows) {
    stats[row.result] = row.count;
    stats.total += row.count;
  }
  return stats;
}

module.exports = { initDb, addGame, getStats };