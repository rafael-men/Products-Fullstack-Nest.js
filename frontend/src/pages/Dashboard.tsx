import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

interface SalesMetrics {
  totalOrders: number;
  averageOrderValue: number;
  totalSales: number;
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SalesMetrics>({
    totalOrders: 0,
    averageOrderValue: 0,
    totalSales: 0,
  });

  useEffect(() => {
    fetch("http://localhost:3000/dev/sales/report")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dados recebidos:", data);
        if (data && data.report) {
          setMetrics(data.report); 
        }
      })
      .catch((err) => console.error("Erro ao buscar relatório de vendas:", err));
  }, []);

  if (!metrics) {
    return <p className="text-center text-lg">Carregando ou sem dados...</p>;
  }


  const salesChartData = {
    labels: ["Total de Vendas"], 
    datasets: [
      {
        label: "Vendas Totais",
        data: [metrics.totalSales], 
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold">Total de Pedidos</h2>
          <p className="text-3xl font-bold">{metrics.totalOrders}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold">Valor Médio por Pedido</h2>
          <p className="text-3xl font-bold">
            {metrics.averageOrderValue ? `R$ ${metrics.averageOrderValue.toFixed(2)}` : "N/A"}
          </p>
        </div>
      </div>

      {/* Gráfico de vendas */}
      <div className="mt-6 bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Vendas Totais</h2>
        <Bar data={salesChartData} />
      </div>
    </div>
  );
};

export default Dashboard;
