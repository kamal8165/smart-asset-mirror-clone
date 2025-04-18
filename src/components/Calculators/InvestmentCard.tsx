
import { Card, CardContent } from '@/components/ui/card';
import { useInvestmentCalculator } from '@/hooks/useInvestmentCalculator';
import InvestmentForm from './InvestmentForm';

const InvestmentCard = ({
  initialAmount,
  monthlyContribution,
  years,
  annualReturn,
  setInitialAmount,
  setMonthlyContribution,
  setYears,
  setAnnualReturn,
  calculateInvestment,
}: {
  initialAmount: number;
  monthlyContribution: number;
  years: number;
  annualReturn: number;
  setInitialAmount: (value: number) => void;
  setMonthlyContribution: (value: number) => void;
  setYears: (value: number) => void;
  setAnnualReturn: (value: number) => void;
  calculateInvestment: () => void;
}) => {
  return (
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
  );
};

export default InvestmentCard;
