import { useEffect, useState } from "react";
import { fetchTransactions } from "../services/api";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const TransactionChart = ({ refresh, saldoInicial }) => { // 🔥 Agora o saldo inicial vem do App.js
  const [chartData, setChartData] = useState([]);
  const [saldoFinal, setSaldoFinal] = useState(0);

  useEffect(() => {
    const loadChartData = async () => {
      const transactions = await fetchTransactions();

      const groupedData = transactions.reduce((acc, t) => {
        const month = t.date.slice(0, 7);
        acc[month] = acc[month] || 0;
        acc[month] += t.type === "receita" ? t.amount : -t.amount;
        return acc;
      }, {});

      let saldoAcumulado = saldoInicial; // 🔥 Agora começamos o saldo com o valor inicial do usuário
      const formattedData = Object.keys(groupedData)
        .sort()
        .map((month) => {
          saldoAcumulado += groupedData[month];
          return { month, saldo: saldoAcumulado };
        });

      setChartData(formattedData);

      if (formattedData.length > 0) {
        setSaldoFinal(formattedData[formattedData.length - 1].saldo);
      } else {
        setSaldoFinal(saldoInicial); // 🔥 Se não houver transações, o saldo final é o saldo inicial
      }
    };

    loadChartData();
  }, [refresh, saldoInicial]);

  return (
    <div style={{ position: "relative", marginTop: "20px" }}>
      {/* 🔥 Exibindo o saldo atualizado com o saldo inicial incluído */}
      <div style={{
        marginTop: "20px",  // 🔥 Criando espaço para não ficar colado no gráfico
        padding: "10px",
        borderRadius: "8px",
        fontSize: "18px",
        fontWeight: "bold",
        color: saldoFinal >= 0 ? "green" : "red",
        backgroundColor: "#f8f9fa",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        display: "inline-block",
      }}>
        💰 Saldo Final: R$ {saldoFinal.toFixed(2)}
      </div>

      <h2 style={{ marginBottom: "15px" }}> Saldo Mensal Acumulado</h2>
      <LineChart width={600} height={300} data={chartData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" />
        <Line type="monotone" dataKey="saldo" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default TransactionChart;





