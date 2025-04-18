
import { Card, CardContent } from '@/components/ui/card';
import { type CalculationResult } from '@/hooks/useInvestmentCalculator';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface InvestmentResultsProps {
  results: CalculationResult[];
}

const InvestmentResults = ({ results }: InvestmentResultsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (results.length === 0) return null;

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">Results</h3>
        <div className="h-[300px] mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={results}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `Year ${label}`}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#2073ba"
                name="Total Balance"
              />
              <Line
                type="monotone"
                dataKey="totalContributed"
                stroke="#27ae60"
                name="Total Contributed"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          <p className="text-lg">
            Final Balance: {formatCurrency(results[results.length - 1].balance)}
          </p>
          <p className="text-lg">
            Total Contributed: {formatCurrency(results[results.length - 1].totalContributed)}
          </p>
          <p className="text-lg">
            Total Earnings: {formatCurrency(results[results.length - 1].earnings)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentResults;
