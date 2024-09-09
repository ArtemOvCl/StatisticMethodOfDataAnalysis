import React, { useState, useEffect } from "react";
import { calculateInitialMoment, calculateCentralMoment } from "@/utils/statistics";
import styles from "./Moments.module.scss";

interface MomentsProps {
  items: number[];
}

const Moments: React.FC<MomentsProps> = ({ items }) => {
  const [order, setOrder] = useState<number>(1);
  const [moments, setMoments] = useState<number[]>([]);

  useEffect(() => {
    const fetchMoments = async () => {
      const initialMoment = await calculateInitialMoment(items, order);
      const centralMoment = await calculateCentralMoment(items, order);
      setMoments([initialMoment, centralMoment]);
    };

    if (items.length) fetchMoments();
  }, [items, order]);

  return (
    <div className={styles.gridMomentsItem}>
      <h1>
        Початкові та центральні моменти 
        <input
          type="number"
          value={order}
          onChange={(e) => {
            const newValue = parseInt(e.target.value, 10);
            if (newValue >= 1 && newValue <= 10) {
              setOrder(newValue);
            }
          }}
          min={1}
          max={10}
          placeholder="Введіть порядок"
        /> порядку
      </h1>
      <p>
        {moments.length ? moments[0].toFixed(10) : "No data"} {moments.length ? moments[1].toFixed(10) : ""} (порядок {order})
      </p>
    </div>
  );
};

export default Moments;
