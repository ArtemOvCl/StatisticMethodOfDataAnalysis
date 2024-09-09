import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { generateChartData, chartOptions } from '@/utils/chartConfig';
import styles from './Chart.module.scss';
import Image from 'next/image';
import { calculateFrequency, calculateRelativeFrequency, calculateCumulativeFrequency, getUniqueItems, calculateCumulativeRelativeFrequency } from '@/utils/frequencyUtils';

interface ChartProps {
  items: number[];
}

const Chart: React.FC<ChartProps> = ({ items }) => {
  const [chartType, setChartType] = useState('Полігон (за частотами)');
  const [uniqueItems, setUniqueItems] = useState<number[]>([]);
  const [frequencyMap, setFrequencyMap] = useState<Map<number, number>>(new Map());

  useEffect(() => {
    const uniqueItems = getUniqueItems(items);

    setUniqueItems(uniqueItems);

    switch (chartType) {
        case 'Полігон (за частотами)':
            setFrequencyMap(calculateFrequency(items));
            break;
        case 'Полігон (за відн. частотами)':
            setFrequencyMap(calculateRelativeFrequency(items, items.length));
            break;
        case 'Комулятивна крива (за накопиченими частотами)':
            setFrequencyMap(calculateCumulativeFrequency(items));
            break;
        case 'Комулятивна крива (за накопиченими відн. частотами)':
            setFrequencyMap(calculateCumulativeRelativeFrequency(items, items.length));
            break;
        case 'Емпірична функція розподілу':
            setFrequencyMap(calculateCumulativeRelativeFrequency(items, items.length));
            break;
        default:
            break;
      }

  }, [items, chartType]);

  const handleChartTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChartType(event.target.value);
  };

  const renderChart = () => {
    switch (chartType) {
      case 'Полігон (за частотами)':
        return <Line data={generateChartData(uniqueItems, 'Кількість повторень', frequencyMap, '#84B026', false)} options={chartOptions(chartType)} />;
      case 'Полігон (за відн. частотами)':
        return <Line data={generateChartData(uniqueItems, 'Відносні частоти', frequencyMap, '#FF5733', false)} options={chartOptions(chartType)} />;
      case 'Комулятивна крива (за накопиченими частотами)':
        return <Line data={generateChartData(uniqueItems, 'Комулятивна крива (за накопиченими частотами)', frequencyMap, '#d960cd', false)} options={chartOptions(chartType)} />;
      case 'Комулятивна крива (за накопиченими відн. частотами)':
        return <Line data={generateChartData(uniqueItems, 'Комулятивна крива (за накопиченими відн. частотами)', frequencyMap, '#9480de', false)} options={chartOptions(chartType)} />;
      case 'Емпірична функція розподілу':
        return <Line data={generateChartData(uniqueItems, 'Емпірична функція розподілу', frequencyMap, '#FFFFFF', true)} options={chartOptions(chartType)} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.header}>
        <h1>Графік</h1>
        <select value={chartType} onChange={handleChartTypeChange} className={styles.chartSelector}>
          <option value="Полігон (за частотами)">Полігон (за частотами)</option>
          <option value="Полігон (за відн. частотами)">Полігон (за відносними частотами)</option>
          <option value="Комулятивна крива (за накопиченими частотами)">Комулятивна крива (за накопиченими частотами)</option>
          <option value="Комулятивна крива (за накопиченими відн. частотами)">Комулятивна крива (за накопиченими відн. частотами)</option>
          <option value="Емпірична функція розподілу">Емпірична функція розподілу</option>
        </select>
      </div>
      <div className={styles.canvasWrapper}>
        {uniqueItems.length === 0 ? (
          <Image src="/analytics.svg" alt="Placeholder" className={styles.chartImage} width={150} height={150} />
        ) : (
          renderChart()
        )}
      </div>
    </div>
  );
};

export default Chart;
