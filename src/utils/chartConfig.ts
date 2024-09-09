import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  );

export const generateChartData = (uniqueItems: number[], label: string, dataMap: Map<number, number>, color: string, isEFR: boolean) => ({
    labels: uniqueItems.map(item => item.toString()),
    datasets: [
      {
        label,
        data: uniqueItems.map(item => dataMap.get(item) || 0),
        fill: false,
        borderColor: color,
        backgroundColor: color,
        pointBorderColor: color,
        pointBackgroundColor: color,
        stepped: isEFR,
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.2,
      },
    ],
  });
  
  export const chartOptions = (chartType: string) => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#E5CFB8',
        },
      },
      title: {
        display: true,
        text: chartType,
        color: '#E5CFB8',
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems: { label: any }[]) => tooltipItems[0].label || '',
          label: (tooltipItem: { raw: any }) => `Значення: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Значення',
          color: '#E5CFB8',
        },
        ticks: {
          color: '#E5CFB8',
        },
        grid: {
          color: '#E5CFB8',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Частота',
          color: '#E5CFB8',
        },
        ticks: {
          color: '#E5CFB8',
        },
        grid: {
          color: '#E5CFB8',
        },
      },
    },
  });
  