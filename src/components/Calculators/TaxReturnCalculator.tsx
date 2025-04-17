
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Save, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type TaxInputs = {
  wages: number;
  selfEmployment: number;
  otherIncome: number;
  withholdings: number;
  deductions: number;
  filingStatus: string;
  dependents: number;
};

const TaxReturnCalculator = () => {
  const [inputs, setInputs] = useState<TaxInputs>({
    wages: 0,
    selfEmployment: 0,
    otherIncome: 0,
    withholdings: 0,
    deductions: 0,
    filingStatus: 'single',
    dependents: 0,
  });
  
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<{
    totalIncome: number;
    totalTax: number;
    amountOwed: number;
    refundAmount: number;
  } | null>(null);

  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleInputChange = (field: keyof TaxInputs, value: string) => {
    const numValue = field === 'filingStatus' ? value : parseFloat(value) || 0;
    setInputs(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const calculateTaxReturn = async () => {
    setIsCalculating(true);
    try {
      // Calculate total income
      const totalIncome = inputs.wages + inputs.selfEmployment + inputs.otherIncome;
      
      // Simple tax calculation (this should be replaced with more accurate calculations)
      let taxRate = 0.22; // Example rate
      if (totalIncome < 50000) taxRate = 0.12;
      if (totalIncome > 100000) taxRate = 0.24;
      
      const totalTax = totalIncome * taxRate;
      const amountOwed = Math.max(0, totalTax - inputs.withholdings);
      const refundAmount = Math.max(0, inputs.withholdings - totalTax);
      
      setResults({
        totalIncome,
        totalTax,
        amountOwed,
        refundAmount
      });
      
      setShowResults(true);
    } catch (error) {
      console.error('Error calculating taxes:', error);
      toast({
        title: "Calculation Error",
        description: "There was an error calculating your taxes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-smartasset-blue-dark">Enter Your Tax Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Income Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Income</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="wages">Wages (W-2 Income)</Label>
                    <Input
                      id="wages"
                      type="number"
                      value={inputs.wages}
                      onChange={(e) => handleInputChange('wages', e.target.value)}
                      className="font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="selfEmployment">Self-Employment Income</Label>
                    <Input
                      id="selfEmployment"
                      type="number"
                      value={inputs.selfEmployment}
                      onChange={(e) => handleInputChange('selfEmployment', e.target.value)}
                      className="font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otherIncome">Other Income</Label>
                    <Input
                      id="otherIncome"
                      type="number"
                      value={inputs.otherIncome}
                      onChange={(e) => handleInputChange('otherIncome', e.target.value)}
                      className="font-medium"
                    />
                  </div>
                </div>

                {/* Tax Details Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Tax Details</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="withholdings">Tax Withholdings</Label>
                    <Input
                      id="withholdings"
                      type="number"
                      value={inputs.withholdings}
                      onChange={(e) => handleInputChange('withholdings', e.target.value)}
                      className="font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deductions">Total Deductions</Label>
                    <Input
                      id="deductions"
                      type="number"
                      value={inputs.deductions}
                      onChange={(e) => handleInputChange('deductions', e.target.value)}
                      className="font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="filing-status">Filing Status</Label>
                    <Select
                      value={inputs.filingStatus}
                      onValueChange={(value) => handleInputChange('filingStatus', value)}
                    >
                      <SelectTrigger id="filing-status">
                        <SelectValue placeholder="Select filing status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married Filing Jointly</SelectItem>
                        <SelectItem value="head">Head of Household</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dependents">Number of Dependents</Label>
                    <Input
                      id="dependents"
                      type="number"
                      min="0"
                      value={inputs.dependents}
                      onChange={(e) => handleInputChange('dependents', e.target.value)}
                      className="font-medium"
                    />
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-smartasset-blue hover:bg-smartasset-blue-dark"
                onClick={calculateTaxReturn}
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  'Calculate Tax Return'
                )}
              </Button>

              {/* Results Section */}
              {showResults && results && (
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-xl font-semibold mb-4">Your Tax Return Results</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="text-gray-600">Total Income</p>
                      <p className="text-2xl font-semibold text-smartasset-blue">
                        {formatCurrency(results.totalIncome)}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="text-gray-600">Total Tax</p>
                      <p className="text-2xl font-semibold text-smartasset-blue">
                        {formatCurrency(results.totalTax)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-6 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
                    {results.refundAmount > 0 ? (
                      <div className="text-center">
                        <h4 className="text-xl font-semibold text-green-600 mb-2">Expected Refund</h4>
                        <p className="text-3xl font-bold text-green-700">
                          {formatCurrency(results.refundAmount)}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <h4 className="text-xl font-semibold text-red-600 mb-2">Amount You Owe</h4>
                        <p className="text-3xl font-bold text-red-700">
                          {formatCurrency(results.amountOwed)}
                        </p>
                      </div>
                    )}
                  </div>

                  {!isAuthenticated && (
                    <div className="mt-4 p-4 bg-amber-50 rounded-lg flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm text-amber-800">
                          <Link to="/signin" className="font-medium hover:underline">
                            Sign in
                          </Link> to save this calculation to your profile and access it later.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaxReturnCalculator;
