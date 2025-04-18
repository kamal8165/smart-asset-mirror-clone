
import { useInvestmentCalculator } from '@/hooks/useInvestmentCalculator';
import InvestmentCard from './InvestmentCard';
import InvestmentResults from './InvestmentResults';

const InvestmentCalculator = () => {
  const {
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
  } = useInvestmentCalculator();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InvestmentCard
          initialAmount={initialAmount}
          monthlyContribution={monthlyContribution}
          years={years}
          annualReturn={annualReturn}
          setInitialAmount={setInitialAmount}
          setMonthlyContribution={setMonthlyContribution}
          setYears={setYears}
          setAnnualReturn={setAnnualReturn}
          calculateInvestment={calculateInvestment}
        />
        <InvestmentResults results={results} />
      </div>
    </div>
  );
};

export default InvestmentCalculator;
