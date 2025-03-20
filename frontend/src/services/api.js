import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // Certifique-se de que a porta está correta

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Função para buscar transações
export const fetchTransactions = async () => {
  const response = await api.get("/transactions/");
  return response.data;
};

// Função para adicionar uma transação
export const addTransaction = async (transaction) => {
  const response = await api.post("/transactions/", transaction);
  return response.data;
};

// 🔥 Função para excluir uma transação (Adicione no final)
export const deleteTransaction = async (transactionId) => {
  await api.delete(`/transactions/${transactionId}/`);
};


