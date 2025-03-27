const db = require("../database.js");
const bcrypt = require("bcrypt");

class User {
  static async create(username, password) {
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users (username, password)
         VALUES (?, ?)`,
        [username, hashedPassword],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              id: this.lastID,
              username: username
            });
          }
        }
      );
    });
  }
  
  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM users WHERE username = ?`,
        [username],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  }
  
  static async verifyPassword(user, password) {
    try {
      return await bcrypt.compare(password, user.password);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;