const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'chat.db');


const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log("Error connecting to database", err.message);
  } else {
    console.log("Connected to database");
  }
});


db.run('Pragma foreign_keys = ON');

function initializeDatabase() {
  db.run(`CREATE TABLE IF NOT EXISTS users (
                id INETEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
          `, (err) => {
    if (err) {
      console.log("Error creating users table", err.message);
    } else {
      console.log("Table users created or already exists");
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sender_id INTEGER NOT NULL,
                received_id INTEGER,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (sender_id) REFERENCES users(id),
                FOREIGN KEY (receiver_id) REFERENCES users(id)
          )`, (err) => {
    if (err) {
      console.log("Error creating messages table", err.message);
    } else {
      console.log("Table messages created or already exists");
    }
  });
}

initializeDatabase();

module.exports = db;