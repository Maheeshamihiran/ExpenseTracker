-- Add users table for authentication
USE expense_tracker;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add user_id to transactions table to link transactions to users
ALTER TABLE transactions ADD COLUMN user_id VARCHAR(36);
ALTER TABLE transactions ADD FOREIGN KEY (user_id) REFERENCES users(id);

-- Create index for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);