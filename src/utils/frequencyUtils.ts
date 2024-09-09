export const calculateFrequency = (items: number[]): Map<number, number> => {
    const frequencyMap = new Map<number, number>();
    items.forEach(item => {
      frequencyMap.set(item, (frequencyMap.get(item) || 0) + 1);
    });

    return frequencyMap;
  };
  
  export const calculateRelativeFrequency = (items: number[], totalItems: number): Map<number, number> => {
    const frequencyMap = calculateFrequency(items);
  
    const relativeFrequencyMap = new Map<number, number>();
    frequencyMap.forEach((count, item) => {
      relativeFrequencyMap.set(item, count / totalItems);
    });
  
    return relativeFrequencyMap;
  };

  export const calculateCumulativeFrequency = (items: number[]): Map<number, number> => {
    const frequencyMap = calculateFrequency(items);
    const cumulativeFrequencyMap = new Map<number, number>();
    
    let cumulativeCount = 0;
    getUniqueItems(items).forEach(item => {
      cumulativeCount += frequencyMap.get(item) || 0;
      cumulativeFrequencyMap.set(item, cumulativeCount);
    });

    return cumulativeFrequencyMap;
  };
  
  export const calculateCumulativeRelativeFrequency = (items: number[], totalItems: number): Map<number, number> => {
    const cumulativeFrequencyMap = calculateCumulativeFrequency(items);
    const cumulativeRelativeFrequencyMap = new Map<number, number>();
  
    cumulativeFrequencyMap.forEach((cumulativeCount, item) => {
      cumulativeRelativeFrequencyMap.set(item, cumulativeCount / totalItems);
    });
  
    return cumulativeRelativeFrequencyMap;
  };
  
  
  export const getUniqueItems = (items: number[]): number[] => {
    return Array.from(new Set(items)).sort((a, b) => a - b);
  };