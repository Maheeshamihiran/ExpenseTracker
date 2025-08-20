const Transaction = require('../models/Transaction');

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.getAllByUser(req.userId);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTransaction = async (req, res) => {
  try {
    const transactionData = { ...req.body, user_id: req.userId };
    const result = await Transaction.create(transactionData);
    res.status(201).json({ message: 'Transaction created successfully', id: req.body.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Transaction.updateByUser(id, req.body, req.userId);
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
    const result = await Transaction.deleteByUser(id, req.userId);
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