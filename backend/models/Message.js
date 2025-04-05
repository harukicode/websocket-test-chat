const db = require("../database");

class Message {
  static create(senderId, receiverId, content) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO messages (sender_id, received_id, content) VALUES (?, ?, ?)`,
      [senderId, receiverId, content],
      function (err) {
        if (err) {
          reject(err);
        } else {
          db.get(
            `SELECT m.*, u.username as sender_username
                  FROM messages m
                  JOIN users u ON m.sender_id = u.id
                  WHERE m.id = ?`,
            [this.lastID],
            (err, message) => {
              if(err) {
                reject(err);
              } else {
                resolve(message);
              }
            }
          )
        }
      }
    )
  })
}
  
  static getConversation(userId1, userId2, limit = 50) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT m.*, u.username as sender_username
         FROM messages m
         JOIN users u ON m.sender_id = u.id
         WHERE (m.sender_id = ? AND m.received_id = ?)
            OR (m.sender_id = ? AND m.received_id = ?)
         ORDER BY m.created_at DESC
         LIMIT ?`,
        [userId1, userId2, userId2, userId1, limit],
        (err, messages) => {
          if (err) {
            reject(err);
          } else {
            resolve(messages.reverse());
          }
        }
      );
    });
  }
  

  static getLatestMessages(userId, limit = 50) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT m.*, u.username as sender_username
         FROM messages m
         JOIN users u ON m.sender_id = u.id
         WHERE m.sender_id = ? OR m.received_id = ?
         ORDER BY m.created_at DESC
         LIMIT ?`,
        [userId, userId, limit],
        (err, messages) => {
          if (err) {
            reject(err);
          } else {
            resolve(messages.reverse());
          }
        }
      );
    });
  }
}

module.exports = Message;

