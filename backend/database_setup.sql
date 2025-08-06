-- Create database
CREATE DATABASE IF NOT EXISTS expense_tracker;

-- Use the database
USE expense_tracker;

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id VARCHAR(36) PRIMARY KEY,
    type ENUM('income', 'expense') NOT NULL,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_transactions_category ON transactions(category);

-- Insert sample data (optional)
INSERT INTO transactions (id, type, title, amount, date, category, description) VALUES
('sample1', 'income', 'Salary', 5000.00, '2024-01-01', 'Salary', 'Monthly salary'),
('sample2', 'expense', 'Groceries', 150.50, '2024-01-02', 'Food', 'Weekly grocery shopping'),
('sample3', 'income', 'Freelance', 800.00, '2024-01-03', 'Freelance', 'Web development project'),
('sample4', 'expense', 'Gas', 45.00, '2024-01-04', 'Transportation', 'Car fuel');