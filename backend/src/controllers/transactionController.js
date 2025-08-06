const Transaction = require('../models/Transaction');

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.getAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTransaction = async (req, res) => {
  try {
    const result = await Transaction.create(req.body);
    res.status(201).json({ message: 'Transaction created successfully', id: req.body.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Transaction.update(id, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json({ message: 'Transaction updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Transaction.delete(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
};