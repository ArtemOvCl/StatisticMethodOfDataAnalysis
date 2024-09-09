export const calculateMean = async (numbers: number[]): Promise<number> => {
    
    if (numbers.length === 0) return NaN;

    return numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
  };
  
  export const calculateMedian = async (numbers: number[]): Promise<number> => {
    
    if (numbers.length === 0) return NaN;

    const sorted = [...numbers].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
  };
  
  export const calculateMode = async (numbers: number[]): Promise<number[]> => {
    
    if (numbers.length === 0) return [];

    const frequency: { [key: number]: number } = {};

    numbers.forEach(num => frequency[num] = (frequency[num] || 0) + 1);
    const maxFreq = Math.max(...Object.values(frequency));
    
    return Object.keys(frequency).filter(num => frequency[+num] === maxFreq).map(num => +num);
  };
  
  export const calculateRange = async (numbers: number[]): Promise<number> => {
    
    if (numbers.length === 0) return NaN;

    const min = Math.min(...numbers);
    const max = Math.max(...numbers);

    return max - min;
  };

export const calculateDispersion = async (mean: number, numbers: number[]): Promise<number> => {
  
  if (numbers.length === 0) return NaN;

  return numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numbers.length;
};

export const calculateCorrectedDispersion = async (mean: number, numbers: number[]): Promise<number> => {
  
  if (numbers.length < 2) return NaN;

  return numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / (numbers.length - 1);
};

export const calculateStandardDeviation = async (dispersion: number): Promise<number> => {

  return Math.sqrt(dispersion); 
};

export const calculateCorrectedStandardDeviation = async (correctedDispersion: number): Promise<number> => {

  return Math.sqrt(correctedDispersion);
};

export const calculateVariation = async(correctedStandardDeviation: number, mean: number): Promise<number> => {

  return correctedStandardDeviation / mean;
}

export const calculateInitialMoment = async (numbers: number[], order: number): Promise<number> => {

  if (numbers.length === 0) return NaN;

  const moment = numbers.reduce((acc, num) => acc + Math.pow(num, order), 0) / numbers.length;
  return moment;
};

export const calculateCentralMoment = async (numbers: number[], order: number): Promise<number> => {

  if (numbers.length === 0) return NaN;

  const mean = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;

  const moment = numbers.reduce((acc, num) => acc + Math.pow(num - mean, order), 0) / numbers.length;
  return moment;
};

export const calculateAsymetry = async (mean: number, standardDeviation: number, numbers: number[]): Promise<number> => {
  
  if (numbers.length === 0) return NaN;

  const mu3 = await calculateCentralMoment(numbers, 3);
  
  return mu3 / Math.pow(standardDeviation, 3);
};

export const calculateExcess = async (mean: number, standardDeviation: number, numbers: number[]): Promise<number> => {
  if (numbers.length === 0) return NaN;

  const mu4 = await calculateCentralMoment(numbers, 4);
  
  return (mu4 / Math.pow(standardDeviation, 4)) - 3;
};