'use client'
import React, { useState } from "react";
import Header from "@/components/Header/Header";
import Grid from "@/components/Grid/Grid";
import styles from "./page.module.scss";

const Home: React.FC = () => {
  const [items, setItems] = useState<number[]>([]);

  const handleAddNumbers = (numbers: number[]) => {
    setItems(numbers);
  };

  return (
    <div>
      <Header onAddNumbers={handleAddNumbers} />
      <Grid items={items} />
    </div>
  );
};

export default Home;