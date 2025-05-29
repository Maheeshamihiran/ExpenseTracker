import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './TransactionForm.css';

type Category = {
  id: string;
  name: string;
  type: 'income' | 'expense';
};

type Transaction = {
  id: string;
  type: 'income' | 'expense';
  title: string;
  amount: number;
  date: string;
  category: string;
};

type TransactionFormProps = {
  type: 'income' | 'expense';
  categories: Category[];
  editingTransaction: any;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, type: 'income' | 'expense') => void;
  transactions: Transaction[];
};

const COLORS = ['#059669', '#047857', '#065f46', '#064e3b', '#022c22'];

const TransactionForm: React.FC<TransactionFormProps> = ({
  type,
  categories,
  editingTransaction,
  onSubmit,
  transactions,
}) => {
  const categoryData = categories
    .filter(cat => cat.type === type)
    .map(category => {
      const totalAmount = transactions
        .filter(t => t.type === type && t.category === category.name)
        .reduce((sum, t) => sum + t.amount, 0);
      return {
        name: category.name,
        value: totalAmount,
      };
    })
    .filter(item => item.value > 0);

  return (
    <div className="form-container">
      <h2 className="page-title">
        {editingTransaction ? 'Edit' : 'Add'} {type === 'income' ? 'Income' : 'Expense'}
      </h2>
      {type === 'income' && categoryData.length > 0 && (
        <div className="chart-container">
          <h3 className="chart-title">Income Distribution by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      <form onSubmit={(e) => onSubmit(e, type)}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            required
            defaultValue={editingTransaction?.title}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Amount</label>
          <input
            type="number"
            name="amount"
            required
            min="0"
            step="0.01"
            defaultValue={editingTransaction?.amount}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="date"
            required
            defaultValue={editingTransaction?.date}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            name="category"
            required
            defaultValue={editingTransaction?.category}
            className="form-input"
          >
            {categories
              .filter(cat => cat.type === type)
              .map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            rows={3}
            defaultValue={editingTransaction?.description}
            className="form-input"
          />
        </div>
        <button type="submit" className="form-submit">
          {editingTransaction ? 'Update' : 'Add'} {type === 'income' ? 'Income' : 'Expense'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;