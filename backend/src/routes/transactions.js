const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController');

// All transaction routes require authentication
router.get('/', authenticateToken, getAllTransactions);
router.post('/', authenticateToken, createTransaction);
router.put('/:id', authenticateToken, updateTransaction);
router.delete('/:id', authenticateToken, deleteTransaction);

module.exports = router;