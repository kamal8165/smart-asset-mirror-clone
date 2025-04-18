
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface CalculationResult {
  year: number;
  balance: number;
  totalContributed: number;
  earnings: number;
}

const InvestmentCalculator = () => {
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Investment Details</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="initialAmount">Initial Investment</Label>
                <Input
                  id="initialAmount"
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                <Input
                  id="monthlyContribution"
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="years">Investment Period (Years)</Label>
                <Input
                  id="years"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="annualReturn">Expected Annual Return (%)</Label>
                <Input
                  id="annualReturn"
                  type="number"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(Number(e.target.value))}
                />
              </div>
              <Button onClick={calculateInvestment} className="w-full">
                Calculate
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Results</h3>
            {results.length > 0 && (
              <>
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
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
