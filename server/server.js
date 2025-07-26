// server.js (SQLite version)
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Create or open the SQLite DB file
const db = new sqlite3.Database(path.join(__dirname, 'portfolio.db'), (err) => {
  if (err) return console.error('❌ Failed to open DB', err);
  console.log('✅ SQLite DB ready');
});

// ✅ Auto-create table on first run
db.run(`
  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// ✅ Form submit endpoint
app.post('/submit-contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const stmt = db.prepare('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)');
  stmt.run(name, email, message, (err) => {
    if (err) {
      console.error('❌ Insert failed:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ success: true, message: 'Message saved!' });
  });
  stmt.finalize();
});

app.listen(PORT, () => {
  console.log(`🚀 SQLite backend running at http://localhost:${PORT}`);
});
