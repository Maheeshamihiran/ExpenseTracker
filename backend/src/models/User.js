const { pool } = require('../config/database');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

class User {
  static async create(userData) {
    const { name, email, password } = userData;
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = 'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)';
    const [result] = await pool.execute(query, [id, name, email, hashedPassword]);
    
    return { id, name, email };
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows[0] || null;
  }

  static async findById(id) {
    const query = 'SELECT id, name, email, created_at FROM users WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0] || null;
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;