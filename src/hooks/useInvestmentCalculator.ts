
import { useState } from 'react';

interface CalculationResult {
  year: number;
  balance: number;
  totalContributed: number;
  earnings: number;
}

export const useInvestmentCalculator = () => {
  const [initialAmount, setInitialAmount] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [years, setYears] = useState<number>(20);
  const [annualReturn, setAnnualReturn] = useState<number>(7);
  const [results, setResults] = useState<CalculationResult[]>([]);

  const calculateInvestment = () => {
    const monthlyRate = annualReturn / 12 / 100;
    const totalMonths = years * 12;
    let balance = initialAmount;
    const results: CalculationResult[] = [];
    let totalContributed = initialAmount;

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        balance = balance * (1 + monthlyRate) + monthlyContribution;
        totalContributed += monthlyContribution;
      }

      results.push({
        year,
        balance: Math.round(balance),
        totalContributed: Math.round(totalContributed),
        earnings: Math.round(balance - totalContributed),
      });
    }

    setResults(results);
  };

  return {
    initialAmount,
    setInitialAmount,
    monthlyContribution,
    setMonthlyContribution,
    years,
    setYears,
    annualReturn,
    setAnnualReturn,
    results,
    calculateInvestment,
  };
};

export type { CalculationResult };
