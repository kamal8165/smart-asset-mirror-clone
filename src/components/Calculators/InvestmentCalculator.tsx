
import { Card, CardContent } from '@/components/ui/card';
import { useInvestmentCalculator } from '@/hooks/useInvestmentCalculator';
import InvestmentForm from './InvestmentForm';
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
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Investment Details</h3>
            <InvestmentForm
              initialAmount={initialAmount}
              monthlyContribution={monthlyContribution}
              years={years}
              annualReturn={annualReturn}
              onInitialAmountChange={setInitialAmount}
              onMonthlyContributionChange={setMonthlyContribution}
              onYearsChange={setYears}
              onAnnualReturnChange={setAnnualReturn}
              onCalculate={calculateInvestment}
            />
          </CardContent>
        </Card>
        <InvestmentResults results={results} />
      </div>
    </div>
  );
};

export default InvestmentCalculator;
