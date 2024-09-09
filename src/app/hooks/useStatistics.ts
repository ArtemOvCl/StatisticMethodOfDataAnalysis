import { useEffect, useState } from "react";
import {
  calculateMean,
  calculateMedian,
  calculateMode,
  calculateRange,
  calculateDispersion,
  calculateStandardDeviation,
  calculateCorrectedDispersion,
  calculateCorrectedStandardDeviation,
  calculateVariation,
  calculateAsymetry,
  calculateExcess
} from "@/utils/statistics";

export const useStatistics = (items: number[]) => {
  const [results, setResults] = useState<number[][]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      const mean = await calculateMean(items);
      const median = await calculateMedian(items);
      const mode = await calculateMode(items);
      const range = await calculateRange(items);
      const dispersion = await calculateDispersion(mean, items);
      const deviation = await calculateStandardDeviation(dispersion);
      const correctedDispertion = await calculateCorrectedDispersion(mean, items);
      const correctedStandartDeviation = await calculateCorrectedStandardDeviation(correctedDispertion);
      const variation = await calculateVariation(correctedStandartDeviation, mean);
      const asymetry = await calculateAsymetry(mean, deviation, items);
      const excess = await calculateExcess(mean, deviation, items);

      setResults([
        [mean, median, range],
        [...mode],
        [dispersion, deviation, correctedDispertion, correctedStandartDeviation],
        [variation, asymetry, excess],
      ]);
    };

    if (items.length) fetchResults();
  }, [items]);

  return { results };
};