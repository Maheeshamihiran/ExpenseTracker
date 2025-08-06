# Expense Tracker Backend

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Configure MySQL database:
   - Create a MySQL database named `expense_tracker`
   - Update the `.env` file with your MySQL credentials

3. Start the server:
```bash
npm run dev
```

## API Endpoints

- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction
- `GET /api/health` - Health check

## Environment Variables

Create a `.env` file with:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=expense_tracker
```