const { pool } = require('../config/database');

class Transaction {
  static async getAll() {
    const [rows] = await pool.execute('SELECT * FROM transactions ORDER BY date DESC');
    return rows;
  }

  static async getAllByUser(userId) {
    const [rows] = await pool.execute('SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC', [userId]);
    return rows;
  }

  static async create(transaction) {
    const { id, type, title, amount, date, category, description, user_id } = transaction;
    const [result] = await pool.execute(
      'INSERT INTO transactions (id, type, title, amount, date, category, description, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, type, title, amount, date, category, description, user_id]
    );
    return result;
  }

  static async update(id, transaction) {
    const { title, amount, date, category, description } = transaction;
    const [result] = await pool.execute(
      'UPDATE transactions SET title = ?, amount = ?, date = ?, category = ?, description = ? WHERE id = ?',
      [title, amount, date, category, description, id]
    );
    return result;
  }

  static async updateByUser(id, transaction, userId) {
    const { title, amount, date, category, description } = transaction;
    const [result] = await pool.execute(
      'UPDATE transactions SET title = ?, amount = ?, date = ?, category = ?, description = ? WHERE id = ? AND user_id = ?',
      [title, amount, date, category, description, id, userId]
    );
    return result;
  }

  static async delete(id) {
    const [result] = await pool.execute('DELETE FROM transactions WHERE id = ?', [id]);
    return result;
  }

  static async deleteByUser(id, userId) {
    const [result] = await pool.execute('DELETE FROM transactions WHERE id = ? AND user_id = ?', [id, userId]);
    return result;
  }
}

module.exports = Transaction;