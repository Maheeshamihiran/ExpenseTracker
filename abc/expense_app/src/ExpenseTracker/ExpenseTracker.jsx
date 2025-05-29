import React, { useState } from 'react';
import { DollarSign, Plus, List, Calendar, CreditCard } from 'lucide-react';
import './ExpenseTracker.css';

const ExpenseTracker = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  // Form states
  const [expenseForm, setExpenseForm] = useState({
    title: '',
    amount: '',
    date: '',
    category: 'Food',
    description: ''
  });

  const [incomeForm, setIncomeForm] = useState({
    title: '',
    amount: '',
    date: '',
    category: 'Salary',
    description: ''
  });

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const expenseCategories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'];
  const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];

  const handleExpenseSubmit = () => {
    if (expenseForm.title && expenseForm.amount && expenseForm.date) {
      setExpenses([...expenses, { ...expenseForm, id: Date.now(), type: 'expense' }]);
      setExpenseForm({ title: '', amount: '', date: '', category: 'Food', description: '' });
      setCurrentPage('dashboard');
    }
  };

  const handleIncomeSubmit = () => {
    if (incomeForm.title && incomeForm.amount && incomeForm.date) {
      setIncome([...income, { ...incomeForm, id: Date.now(), type: 'income' }]);
      setIncomeForm({ title: '', amount: '', date: '', category: 'Salary', description: '' });
      setCurrentPage('dashboard');
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    alert('Payment processed successfully!');
    setShowPayment(false);
    setPaymentForm({ cardNumber: '', expiry: '', cvc: '' });
  };

  const totalIncome = income.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  const balance = totalIncome - totalExpenses;

  const allTransactions = [...expenses, ...income].sort((a, b) => new Date(b.date) - new Date(a.date));

  const Sidebar = () => (
    <div className="sidebar">
      <div className="sidebar-header">
        <DollarSign className="sidebar-icon" />
        <h1>ExpenseTracker</h1>
      </div>
      
      <nav className="sidebar-nav">
        <button
          onClick={() => setCurrentPage('dashboard')}
          className={currentPage === 'dashboard' ? 'active' : ''}
        >
          <DollarSign className="nav-icon" />
          Dashboard
        </button>
        
        <button
          onClick={() => setCurrentPage('add-expense')}
          className={currentPage === 'add-expense' ? 'active' : ''}
        >
          <Plus className="nav-icon" />
          Add Expense
        </button>
        
        <button
          onClick={() => setCurrentPage('add-income')}
          className={currentPage === 'add-income' ? 'active' : ''}
        >
          <Plus className="nav-icon" />
          Add Income
        </button>
        
        <button
          onClick={() => setCurrentPage('transactions')}
          className={currentPage === 'transactions' ? 'active' : ''}
        >
          <List className="nav-icon" />
          Transactions
        </button>
      </nav>
    </div>
  );

  const Dashboard = () => (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Income</h3>
          <p className="income">${totalIncome.toFixed(2)}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Expenses</h3>
          <p className="expense">${totalExpenses.toFixed(2)}</p>
        </div>
        
        <div className="stat-card">
          <h3>Balance</h3>
          <p className={balance >= 0 ? 'income' : 'expense'}>
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="recent-transactions">
        <div className="transactions-header">
          <h3>Recent Transactions</h3>
          <button
            onClick={() => setShowPayment(true)}
            className="payment-button"
          >
            Educational License - $15.99
          </button>
        </div>
        
        <div className="transactions-list">
          {allTransactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <div>
                <p className="transaction-title">{transaction.title}</p>
                <p className="transaction-meta">{transaction.date} • {transaction.category}</p>
              </div>
              <span className={`transaction-amount ${transaction.type}`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
              </span>
            </div>
          ))}
          
          {allTransactions.length === 0 && (
            <p className="empty-state">No transactions yet. Add some income or expenses to get started!</p>
          )}
        </div>
      </div>
    </div>
  );

  const AddExpense = () => (
    <div className="form-container">
      <h2>Add Expense</h2>
      
      <div className="form-card">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={expenseForm.title}
            onChange={(e) => setExpenseForm({...expenseForm, title: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            step="0.01"
            value={expenseForm.amount}
            onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={expenseForm.date}
            onChange={(e) => setExpenseForm({...expenseForm, date: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <select
            value={expenseForm.category}
            onChange={(e) => setExpenseForm({...expenseForm, category: e.target.value})}
          >
            {expenseCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={expenseForm.description}
            onChange={(e) => setExpenseForm({...expenseForm, description: e.target.value})}
            rows="3"
          />
        </div>
        
        <button
          type="button"
          onClick={handleExpenseSubmit}
          className="submit-button"
        >
          Add Expense
        </button>
      </div>
    </div>
  );

  const AddIncome = () => (
    <div className="form-container">
      <h2>Add Income</h2>
      
      <div className="form-card">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={incomeForm.title}
            onChange={(e) => setIncomeForm({...incomeForm, title: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            step="0.01"
            value={incomeForm.amount}
            onChange={(e) => setIncomeForm({...incomeForm, amount: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={incomeForm.date}
            onChange={(e) => setIncomeForm({...incomeForm, date: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <select
            value={incomeForm.category}
            onChange={(e) => setIncomeForm({...incomeForm, category: e.target.value})}
          >
            {incomeCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={incomeForm.description}
            onChange={(e) => setIncomeForm({...incomeForm, description: e.target.value})}
            rows="3"
          />
        </div>
        
        <button
          type="button"
          onClick={handleIncomeSubmit}
          className="submit-button"
        >
          Add Income
        </button>
      </div>
    </div>
  );

  const Transactions = () => (
    <div className="transactions-container">
      <h2>All Transactions</h2>
      
      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {allTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.title}</td>
                <td>{transaction.category}</td>
                <td>
                  <span className={`type-badge ${transaction.type}`}>
                    {transaction.type}
                  </span>
                </td>
                <td className={`amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {allTransactions.length === 0 && (
          <div className="empty-state">
            No transactions found. Start by adding some income or expenses!
          </div>
        )}
      </div>
    </div>
  );

  const PaymentModal = () => (
    <div className="payment-modal">
      <div className="payment-content">
        <div className="payment-header">
          <h3>Payment Details</h3>
          <button
            onClick={() => setShowPayment(false)}
            className="close-button"
          >
            ×
          </button>
        </div>
        
        <div className="payment-summary">
          <div className="payment-item">
            <span>Educational License</span>
            <span>USD$15.99</span>
          </div>
          <div className="payment-total">
            <span>Total:</span>
            <span>USD$15.99</span>
          </div>
        </div>
        
        <div className="payment-methods">
          <h4>Credit Cards</h4>
          <div className="card-icons">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 32'%3E%3Crect width='48' height='32' rx='4' fill='%23016fd0'/%3E%3Ctext x='24' y='18' text-anchor='middle' fill='white' font-size='8' font-weight='bold'%3EVISA%3C/text%3E%3C/svg%3E" alt="Visa" />
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 32'%3E%3Crect width='48' height='32' rx='4' fill='%23eb001b'/%3E%3Ccircle cx='18' cy='16' r='8' fill='%23eb001b'/%3E%3Ccircle cx='30' cy='16' r='8' fill='%23ff5f00'/%3E%3C/svg%3E" alt="Mastercard" />
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 32'%3E%3Crect width='48' height='32' rx='4' fill='%23006fcf'/%3E%3Ctext x='24' y='12' text-anchor='middle' fill='white' font-size='6' font-weight='bold'%3EAMERICAN%3C/text%3E%3Ctext x='24' y='20' text-anchor='middle' fill='white' font-size='6' font-weight='bold'%3EEXPRESS%3C/text%3E%3C/svg%3E" alt="American Express" />
          </div>
        </div>
        
        <div className="payment-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Card number"
              value={paymentForm.cardNumber}
              onChange={(e) => setPaymentForm({...paymentForm, cardNumber: e.target.value})}
              required
            />
          </div>
          
          <div className="form-row">
            <input
              type="text"
              placeholder="MM / YY"
              value={paymentForm.expiry}
              onChange={(e) => setPaymentForm({...paymentForm, expiry: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="CVC"
              value={paymentForm.cvc}
              onChange={(e) => setPaymentForm({...paymentForm, cvc: e.target.value})}
              required
            />
          </div>
          
          <button
            type="button"
            onClick={handlePayment}
            className="pay-button"
          >
            Pay for order
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <Sidebar />
      
      <div className="main-content">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'add-expense' && <AddExpense />}
        {currentPage === 'add-income' && <AddIncome />}
        {currentPage === 'transactions' && <Transactions />}
      </div>
      
      {showPayment && <PaymentModal />}
    </div>
  );
};

export default ExpenseTracker;