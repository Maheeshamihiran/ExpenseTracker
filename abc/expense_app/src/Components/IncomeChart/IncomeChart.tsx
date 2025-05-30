import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

type Transaction = {
  id: string;
  type: 'income' | 'expense';
  title: string;
  amount: number;
  date: string;
  category: string;
  description: string;
};

type IncomeChartProps = {
  transactions: Transaction[];
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const IncomeChart: React.FC<IncomeChartProps> = ({ transactions }) => {
  // Filter income transactions and group by category
  const incomeData = React.useMemo(() => {
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

  if (incomeData.length === 0) {
    return <div className="income-chart-empty">No income data available</div>;
  }

  return (
    <div className="income-chart-container">
      <h3>Income by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={incomeData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {incomeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeChart;