import React from 'react';
import './Dashboard.css';

type DashboardProps = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

const Dashboard: React.FC<DashboardProps> = ({ totalIncome, totalExpense, balance }) => {
  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      <div className="dashboard-grid">
        <div className="stat-card">
          <h3 className="stat-label">Total Balance</h3>
          <p className={`stat-value ${balance >= 0 ? 'positive' : 'negative'}`}>
            Rs{balance.toFixed(2)}
 npm          </p>
        </div>
        <div className="stat-card">
          <h3 className="stat-label">Total Income</h3>
          <p className="stat-value positive">Rs{totalIncome.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-label">Total Expenses</h3>
          <p className="stat-value negative">Rs{totalExpense.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;