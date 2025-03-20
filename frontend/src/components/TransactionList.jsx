import { useEffect, useState } from "react";
import { fetchTransactions, deleteTransaction } from "../services/api";

const TransactionList = ({ refresh, transactions = [], onTransactionDeleted }) => {
  const [localTransactions, setLocalTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      const data = await fetchTransactions();
      setLocalTransactions(data);
    };

    loadTransactions();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
      try {
        await deleteTransaction(id);

        // 🔥 Atualiza localmente removendo a transação excluída
        setLocalTransactions((prevTransactions) => prevTransactions.filter((t) => t.id !== id));

        if (onTransactionDeleted) {
          onTransactionDeleted(); // 🔄 Atualiza o gráfico
        }

      } catch (error) {
        console.error("Erro ao excluir transação:", error);
        alert("Erro ao excluir transação.");
      }
    }
  };

  return (
    <div>
      <h2>📋 Transações</h2>
      <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
        {localTransactions.length === 0 ? (
          <li style={{ color: "gray", fontStyle: "italic" }}>Nenhuma transação cadastrada.</li>
        ) : (
          localTransactions.map((t) => (
            <li key={t.id} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid #ddd"
            }}>
              <span>
                {t.date} - <strong>{t.type.toUpperCase()}</strong>: {t.description} - R$ {t.amount.toFixed(2)}
              </span>
              <button onClick={() => handleDelete(t.id)} style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer"
              }}>
                ❌ Excluir
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TransactionList;





