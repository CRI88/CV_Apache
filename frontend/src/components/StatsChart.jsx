import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registra los elementos de Chart.js que usaremos
ChartJS.register(ArcElement, Tooltip, Legend);

const StatsChart = ({ habilities }) => {
  // Preparamos los datos para el gráfico
  const data = {
    labels: habilities.map((hability) => hability.name), // Nombres de las habilidades
    datasets: [
      {
        data: habilities.map((hability) => hability.percentage), // Porcentajes de las habilidades
        backgroundColor: [
          '#FF5733', '#33FF57', '#3357FF', '#FF33F6', '#F6FF33', '#33F6FF', // Colores para las secciones del donut
        ],
        hoverBackgroundColor: [
          '#FF5733', '#33FF57', '#3357FF', '#FF33F6', '#F6FF33', '#33F6FF',
        ],
      },
    ],
  };

  // Configuración del gráfico donut
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Posición de la leyenda
      },
      tooltip: {
        enabled: true, // Habilitar tooltips al pasar el cursor
      },
    },
  };

  return (
    <div className="p-4 bg-gradient-to-r from-blue-100 via-gray-200 to-blue-300 rounded-lg shadow-lg w-[700px] h-[750px] mx-auto">
      <h3 className="text-lg font-semibold text-center mb-4">Porcentaje de Habilidades</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default StatsChart;
