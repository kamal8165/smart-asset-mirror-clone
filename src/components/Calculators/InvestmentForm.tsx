
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface InvestmentFormProps {
  initialAmount: number;
  monthlyContribution: number;
  years: number;
  annualReturn: number;
  onInitialAmountChange: (value: number) => void;
  onMonthlyContributionChange: (value: number) => void;
  onYearsChange: (value: number) => void;
  onAnnualReturnChange: (value: number) => void;
  onCalculate: () => void;
}

const InvestmentForm = ({
  initialAmount,
  monthlyContribution,
  years,
  annualReturn,
  onInitialAmountChange,
  onMonthlyContributionChange,
  onYearsChange,
  onAnnualReturnChange,
  onCalculate,
}: InvestmentFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="initialAmount">Initial Investment</Label>
        <Input
          id="initialAmount"
          type="number"
          value={initialAmount}
          onChange={(e) => onInitialAmountChange(Number(e.target.value))}
        />
      </div>
      <div>
        <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
        <Input
          id="monthlyContribution"
          type="number"
          value={monthlyContribution}
          onChange={(e) => onMonthlyContributionChange(Number(e.target.value))}
        />
      </div>
      <div>
        <Label htmlFor="years">Investment Period (Years)</Label>
        <Input
          id="years"
          type="number"
          value={years}
          onChange={(e) => onYearsChange(Number(e.target.value))}
        />
      </div>
      <div>
        <Label htmlFor="annualReturn">Expected Annual Return (%)</Label>
        <Input
          id="annualReturn"
          type="number"
          value={annualReturn}
          onChange={(e) => onAnnualReturnChange(Number(e.target.value))}
        />
      </div>
      <Button onClick={onCalculate} className="w-full">
        Calculate
      </Button>
    </div>
  );
};

export default InvestmentForm;
