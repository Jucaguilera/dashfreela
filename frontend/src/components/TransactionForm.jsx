import { useState } from "react";
import { addTransaction } from "../services/api";

const TransactionForm = ({ onTransactionAdded }) => {
  const [type, setType] = useState("receita");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = { type, description, amount: parseFloat(amount), date };

    await addTransaction(newTransaction);
    onTransactionAdded();
    setDescription("");
    setAmount("");
    setDate("");
  };

  return (
    <div style={{
      width: "100%",
      maxWidth: "350px", /* 🔥 Limitando a largura do formulário */
      textAlign: "left",
      padding: "15px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)"
    }}>
      <h2 style={{ 
        fontSize: "18px",
        color: "#333",
        marginBottom: "10px"
      }}>
        ➕ Adicionar Transação
      </h2>

      <form onSubmit={handleSubmit} style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}>
        <select value={type} onChange={(e) => setType(e.target.value)} style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "14px",
          backgroundColor: "#fff",
          cursor: "pointer"
        }}>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>

        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px"
          }}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px"
          }}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px"
          }}
        />

        <button type="submit" style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          fontSize: "14px",
          cursor: "pointer",
          transition: "0.3s",
        }} 
        onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}>
          ➕ Adicionar
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
