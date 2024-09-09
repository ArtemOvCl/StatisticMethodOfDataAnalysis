import React from "react";
import styles from "./Grid.module.scss";
import { useStatistics } from "@/app/hooks/useStatistics";
import Moments from "./Moments/Moments";
import Chart from "./Chart/Chart";

interface GridProps {
  items: number[];
}

const labels = [
  "Середнє статистичне, медіана та розмах",
  "Мода",
  "Дисперсія, середнє квадратичне відхилення та їх виправлені форми",
  "Варіація, асиметрія та ексцез"
];

const Grid: React.FC<GridProps> = ({ items }) => {
  const { results } = useStatistics(items);

  const formatResults = (results: number[]) => {
    if (results.length > 1) {
      return `${results.map(result => result.toFixed(10)).join(", ")}`;
    }
    return results[0]?.toFixed(2) || "No data";
  };

  const gridSections = labels.map((label, index) => (
    <div key={index} className={styles.gridItem}>
      <h1>{label}</h1>
      <p>{results[index]?.length ? formatResults(results[index]) : "No data"}</p>
    </div>
  ));

  return (
    <div className={styles.container}>
      <h2 className={styles.characteristics}>Характеристики</h2>
      <div className={styles.grid}>
        {gridSections}
        <Moments items={items} />
        <Chart items={items}/>
      </div>
    </div>
  );
};

export default Grid;