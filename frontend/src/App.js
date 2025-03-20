import { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import TransactionChart from "./components/TransactionChart";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [saldoInicial, setSaldoInicial] = useState(0);
  const [valoresRecebidos, setValoresRecebidos] = useState([]); // 🔥 Lista de valores já recebidos

  const handleTransactionUpdated = () => {
    setRefresh((prev) => !prev);
  };

  // 🔥 Função para mover receita recebida para saldo do banco e removê-la da lista principal
  const handleReceberValor = (transaction) => {
    setSaldoInicial((prevSaldo) => prevSaldo + transaction.amount);
    setValoresRecebidos((prevValores) => [...prevValores, transaction]);
    handleTransactionUpdated();
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
      fontFamily: "Inter, sans-serif",
      padding: "20px",
    }}>
      <h1 style={{
        fontWeight: "bold",
        color: "#333",
        marginBottom: "20px",
        textAlign: "center",
      }}>
        💰 Dashboard Financeiro do Freelancer
      </h1>

      {/* Input para o saldo atual */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "20px",
      }}>
        <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
          Saldo Atual no Banco:
        </label>
        <input
          type="number"
          value={saldoInicial}
          onChange={(e) => setSaldoInicial(parseFloat(e.target.value) || 0)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "14px",
            textAlign: "center",
            width: "150px",
          }}
        />
      </div>

      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        maxWidth: "900px",
        width: "100%",
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}>
        <TransactionForm onTransactionAdded={handleTransactionUpdated} />

        <div style={{ flex: 1, paddingLeft: "20px" }}>
          <TransactionList 
            refresh={refresh} 
            onTransactionDeleted={handleTransactionUpdated} 
            onReceberValor={handleReceberValor} 
          />
          <TransactionChart refresh={refresh} saldoInicial={saldoInicial} valoresRecebidos={valoresRecebidos} />
        </div>
      </div>
    </div>
  );
}

export default App;







