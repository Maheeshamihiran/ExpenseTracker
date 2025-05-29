import React from 'react';
import { DollarSign, ArrowUpCircle, ArrowDownCircle, List } from 'lucide-react';
import './Sidebar.css';

type SidebarProps = {
  activeTab: string;
  onTabChange: (tab: 'dashboard' | 'addExpense' | 'addIncome' | 'transactions') => void;
};

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="sidebar">
      <h1 className="app-title">
        <DollarSign />
        ExpenseTracker
      </h1>
      <div className="nav-buttons">
        <button
          onClick={() => onTabChange('dashboard')}
          className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
        >
          <DollarSign /> Dashboard
        </button>
        <button
          onClick={() => onTabChange('addExpense')}
          className={`nav-button ${activeTab === 'addExpense' ? 'active' : ''}`}
        >
          <ArrowUpCircle /> Add Expense
        </button>
        <button
          onClick={() => onTabChange('addIncome')}
          className={`nav-button ${activeTab === 'addIncome' ? 'active' : ''}`}
        >
          <ArrowDownCircle /> Add Income
        </button>
        <button
          onClick={() => onTabChange('transactions')}
          className={`nav-button ${activeTab === 'transactions' ? 'active' : ''}`}
        >
          <List /> Transactions
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;