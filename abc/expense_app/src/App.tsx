import React, { useState, useMemo } from 'react';
import { DollarSign, PlusCircle, MinusCircle, ListOrdered, Edit } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
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
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [transactionFilter, setTransactionFilter] = useState<'all' | 'income' | 'expense'>('all');

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

  // Calculate income data for pie chart
  const incomeChartData = useMemo(() => {
    const incomeTransactions = transactions.filter(t => t.type === 'income');
    
    // Group by category and sum amounts
    const categoryMap = new Map<string, number>();
    
    incomeTransactions.forEach(transaction => {
      const currentAmount = categoryMap.get(transaction.category) || 0;
      categoryMap.set(transaction.category, currentAmount + transaction.amount);
    });
    
    // Convert to array format for PieChart
    return Array.from(categoryMap.entries()).map(([name, value]) => ({
      name,
      value
    }));
  }, [transactions]);

  // Calculate expense data for pie chart
  const expenseChartData = useMemo(() => {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    
    // Group by category and sum amounts
    const categoryMap = new Map<string, number>();
    
    expenseTransactions.forEach(transaction => {
      const currentAmount = categoryMap.get(transaction.category) || 0;
      categoryMap.set(transaction.category, currentAmount + transaction.amount);
    });
    
    // Convert to array format for PieChart
    return Array.from(categoryMap.entries()).map(([name, value]) => ({
      name,
      value
    }));
  }, [transactions]);

  // Calculate data for bar chart (income and expense by date)
  const barChartData = useMemo(() => {
    const dateMap = new Map<string, { income: number; expense: number }>();
    
    transactions.forEach(transaction => {
      const date = transaction.date;
      const current = dateMap.get(date) || { income: 0, expense: 0 };
      
      if (transaction.type === 'income') {
        current.income += transaction.amount;
      } else {
        current.expense += transaction.amount;
      }
      
      dateMap.set(date, current);
    });
    
    // Convert to array format for BarChart and sort by date
    return Array.from(dateMap.entries())
      .map(([date, values]) => ({
        date,
        income: values.income,
        expense: values.expense
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [transactions]);

  // Filter transactions based on selected filter
  const filteredTransactions = useMemo(() => {
    if (transactionFilter === 'all') {
      return transactions;
    }
    return transactions.filter(t => t.type === transactionFilter);
  }, [transactions, transactionFilter]);

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    if (editingTransaction) {
      // Update existing transaction
      const updatedTransaction: Transaction = {
        ...editingTransaction,
        title: formData.get('title') as string,
        amount: parseFloat(formData.get('amount') as string),
        date: formData.get('date') as string,
        category: formData.get('category') as string,
        description: formData.get('description') as string
      };
      
      setTransactions(transactions.map(t => 
        t.id === editingTransaction.id ? updatedTransaction : t
      ));
      setEditingTransaction(null);
    } else {
      // Add new transaction
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
    }
    
    form.reset();
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const editTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setActiveTab(transaction.type === 'income' ? 'addIncome' : 'addExpense');
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
            
            <div className="chart-container">
              <h3>Income and Expenses by Date</h3>
              {barChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                    <Legend />
                    <Bar dataKey="income" fill="#00C49F" name="Income" />
                    <Bar dataKey="expense" fill="#FF8042" name="Expense" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="chart-empty">No transaction data available</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'addIncome' && (
          <div className="income-form-layout">
            <div className="income-form-left">
              <div className="form-container">
                <h2 className="page-title">
                  {editingTransaction ? 'Edit Income' : 'Add Income'}
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
                      defaultValue={editingTransaction?.title || ''}
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
                      defaultValue={editingTransaction?.amount || ''}
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
                      defaultValue={editingTransaction?.date || ''}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      name="category"
                      required
                      className="form-input"
                      defaultValue={editingTransaction?.category || ''}
                    >
                      {categories.income.map(
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
                      defaultValue={editingTransaction?.description || ''}
                    />
                  </div>
                  <div className="form-buttons">
                    {editingTransaction && (
                      <button 
                        type="button" 
                        className="cancel-button"
                        onClick={() => setEditingTransaction(null)}
                      >
                        Cancel
                      </button>
                    )}
                    <button type="submit" className="submit-button">
                      {editingTransaction ? 'Update Income' : 'Add Income'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="income-chart-right">
              <div className="income-chart-container">
                <h3>Income by Category</h3>
                {incomeChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={incomeChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {incomeChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="income-chart-empty">No income data available</div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'addExpense' && (
          <div className="income-form-layout">
            <div className="income-form-left">
              <div className="form-container">
                <h2 className="page-title">
                  {editingTransaction ? 'Edit Expense' : 'Add Expense'}
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
                      defaultValue={editingTransaction?.title || ''}
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
                      defaultValue={editingTransaction?.amount || ''}
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
                      defaultValue={editingTransaction?.date || ''}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      name="category"
                      required
                      className="form-input"
                      defaultValue={editingTransaction?.category || ''}
                    >
                      {categories.expense.map(
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
                      defaultValue={editingTransaction?.description || ''}
                    />
                  </div>
                  <div className="form-buttons">
                    {editingTransaction && (
                      <button 
                        type="button" 
                        className="cancel-button"
                        onClick={() => setEditingTransaction(null)}
                      >
                        Cancel
                      </button>
                    )}
                    <button type="submit" className="submit-button">
                      {editingTransaction ? 'Update Expense' : 'Add Expense'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="income-chart-right">
              <div className="income-chart-container">
                <h3>Expense by Category</h3>
                {expenseChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={expenseChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {expenseChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="income-chart-empty">No expense data available</div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="transactions">
            <h2 className="page-title">Transactions</h2>
            
            <div className="transaction-filters">
              <button 
                className={`filter-button ${transactionFilter === 'all' ? 'active' : ''}`}
                onClick={() => setTransactionFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-button income ${transactionFilter === 'income' ? 'active' : ''}`}
                onClick={() => setTransactionFilter('income')}
              >
                Income
              </button>
              <button 
                className={`filter-button expense ${transactionFilter === 'expense' ? 'active' : ''}`}
                onClick={() => setTransactionFilter('expense')}
              >
                Expense
              </button>
            </div>
            
            <div className="transactions-list">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map(transaction => (
                  <div
                    key={transaction.id}
                    className={`transaction-item ${transaction.type}`}
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
                      <div className="transaction-buttons">
                        <button
                          onClick={() => editTransaction(transaction)}
                          className="edit-button"
                        >
                          <Edit size={16} /> Edit
                        </button>
                        <button
                          onClick={() => deleteTransaction(transaction.id)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-transactions">No transactions found</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;