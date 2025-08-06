const API_BASE_URL = 'http://localhost:3001/api';

export const transactionAPI = {
  // Get all transactions
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/transactions`);
    if (!response.ok) throw new Error('Failed to fetch transactions');
    return response.json();
  },

  // Create a new transaction
  create: async (transaction) => {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) throw new Error('Failed to create transaction');
    return response.json();
  },

  // Update a transaction
  update: async (id, transaction) => {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) throw new Error('Failed to update transaction');
    return response.json();
  },

  // Delete a transaction
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete transaction');
    return response.json();
  },
};