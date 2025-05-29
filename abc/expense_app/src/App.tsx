import React, { useState } from 'react';
import { DollarSign, PlusCircle, MinusCircle, ListOrdered } from 'lucide-react';
import './App.css';

type Transaction = {
  id: string;
  type: 'income' | 'expense';
  title: string;
  amount: number;
  date: string;
  category: string;
  description: string;
};

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'addExpense' | 'addIncome' | 'transactions'>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const categories = {
    income: ['Salary', 'Freelance', 'Investments', 'Other'],
    expense: ['Food', 'Transportation', 'Utilities', 'Entertainment', 'Shopping']
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const transaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: activeTab === 'addIncome' ? 'income' : 'expense',
      title: formData.get('title') as string,
      amount: parseFloat(formData.get('amount') as string),
      date: formData.get('date') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string
    };

    setTransactions([...transactions, transaction]);
    form.reset();
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="app-container">
      <nav className="sidebar">
        <h1 className="app-title">
          <DollarSign />
          Expense Tracker
        </h1>
        <div className="nav-links">
          <button
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <DollarSign size={20} />
            Dashboard
          </button>
          <button
            className={`nav-link ${activeTab === 'addIncome' ? 'active' : ''}`}
            onClick={() => setActiveTab('addIncome')}
          >
            <PlusCircle size={20} />
            Add Income
          </button>
          <button
            className={`nav-link ${activeTab === 'addExpense' ? 'active' : ''}`}
            onClick={() => setActiveTab('addExpense')}
          >
            <MinusCircle size={20} />
            Add Expense
          </button>
          <button
            className={`nav-link ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            <ListOrdered size={20} />
            Transactions
          </button>
        </div>
      </nav>

      <main className="main-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard">
            <h2 className="page-title">Dashboard</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Balance</h3>
                <p className={balance >= 0 ? 'positive' : 'negative'}>
                  ${balance.toFixed(2)}
                </p>
              </div>
              <div className="stat-card">
                <h3>Total Income</h3>
                <p className="positive">${totalIncome.toFixed(2)}</p>
              </div>
              <div className="stat-card">
                <h3>Total Expenses</h3>
                <p className="negative">${totalExpense.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {(activeTab === 'addIncome' || activeTab === 'addExpense') && (
          <div className="form-container">
            <h2 className="page-title">
              Add {activeTab === 'addIncome' ? 'Income' : 'Expense'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  min="0"
                  step="0.01"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  required
                  className="form-input"
                >
                  {(activeTab === 'addIncome' ? categories.income : categories.expense).map(
                    category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-input"
                  rows={3}
                />
              </div>
              <button type="submit" className="submit-button">
                Add {activeTab === 'addIncome' ? 'Income' : 'Expense'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="transactions">
            <h2 className="page-title">Transactions</h2>
            <div className="transactions-list">
              {transactions.map(transaction => (
                <div
                  key={transaction.id}
                  className="transaction-item"
                >
                  <div className="transaction-info">
                    <h3>{transaction.title}</h3>
                    <p className="transaction-category">{transaction.category}</p>
                    <p className="transaction-date">{transaction.date}</p>
                    <p className="transaction-description">{transaction.description}</p>
                  </div>
                  <div className="transaction-amount-section">
                    <p className={`transaction-amount ${transaction.type}`}>
                      ${transaction.amount.toFixed(2)}
                    </p>
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;