
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Loader2, Save, AlertCircle } from 'lucide-react';
import * as taxApi from '@/api/taxApi';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const TaxCalculator = () => {
  const [income, setIncome] = useState(75000);
  const [filingStatus, setFilingStatus] = useState('single');
  const [state, setState] = useState('ca');
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [states, setStates] = useState<Array<{code: string; name: string}>>([]);
  const [calculationResults, setCalculationResults] = useState<{
    federalTax: number;
    stateTax: number;
    totalTax: number;
    effectiveRate: number;
    takeHomePay: number;
    monthly: number;
  } | null>(null);
  
  const { isAuthenticated, saveTaxCalculation } = useAuth();
  const { toast } = useToast();

  // Fetch available states
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const statesData = await taxApi.getAvailableStates();
        setStates(statesData);
      } catch (error) {
        console.error("Failed to fetch states:", error);
      }
    };
    
    fetchStates();
  }, []);

  const handleCalculate = async () => {
    setIsCalculating(true);
    
    try {
      const results = await taxApi.getFullTaxCalculation(income, filingStatus, state);
      setCalculationResults(results);
      setShowResults(true);
    } catch (error) {
      console.error("Error calculating taxes:", error);
      // Could show an error message to the user here
    } finally {
      setIsCalculating(false);
    }
  };

  // Use these values for display when we have results
  const federalTax = calculationResults?.federalTax || 0;
  const stateTax = calculationResults?.stateTax || 0;
  const totalTax = calculationResults?.totalTax || 0;
  const effectiveRate = calculationResults?.effectiveRate || 0;

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setIncome(value ? parseInt(value) : 0);
  };

  const handleSliderChange = (value: number[]) => {
    setIncome(value[0]);
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
            <CardTitle className="text-2xl text-smartasset-blue-dark">Income Tax Calculator</CardTitle>
            <CardDescription>
              Estimate your federal and state income taxes based on your income and filing status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Income Input */}
              <div className="space-y-2">
                <Label htmlFor="income">Annual Income</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="income"
                    type="text"
                    value={formatCurrency(income)}
                    onChange={handleIncomeChange}
                    className="font-medium text-lg"
                  />
                </div>
                <Slider
                  defaultValue={[75000]}
                  value={[income]}
                  max={300000}
                  step={1000}
                  onValueChange={handleSliderChange}
                  className="my-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>$0</span>
                  <span>$100k</span>
                  <span>$200k</span>
                  <span>$300k</span>
                </div>
              </div>

              {/* Filing Status */}
              <div className="space-y-2">
                <Label htmlFor="filing-status">Filing Status</Label>
                <Select
                  value={filingStatus}
                  onValueChange={setFilingStatus}
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

              {/* State */}
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select
                  value={state}
                  onValueChange={setState}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.length > 0 ? (
                      states.map((stateItem) => (
                        <SelectItem key={stateItem.code} value={stateItem.code}>
                          {stateItem.name}
                        </SelectItem>
                      ))
                    ) : (
                      <>
                        <SelectItem value="ca">California</SelectItem>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="tx">Texas</SelectItem>
                        <SelectItem value="fl">Florida</SelectItem>
                        <SelectItem value="il">Illinois</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full bg-smartasset-blue hover:bg-smartasset-blue-dark"
                onClick={handleCalculate}
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  'Calculate'
                )}
              </Button>
            </div>

            {/* Results */}
            {showResults && calculationResults && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold mb-4">Tax Estimate Results</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-gray-600">Federal Income Tax</p>
                    <p className="text-2xl font-semibold text-smartasset-blue">{formatCurrency(federalTax)}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-gray-600">State Income Tax</p>
                    <p className="text-2xl font-semibold text-smartasset-blue">{formatCurrency(stateTax)}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-gray-600">Total Income Tax</p>
                    <p className="text-2xl font-semibold text-smartasset-blue">{formatCurrency(totalTax)}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-gray-600">Effective Tax Rate</p>
                    <p className="text-2xl font-semibold text-smartasset-blue">{effectiveRate.toFixed(2)}%</p>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 p-4 rounded">
                  <p className="text-smartasset-blue-dark">
                    <span className="font-semibold">Take-home pay:</span> {formatCurrency(calculationResults.takeHomePay)} per year
                  </p>
                  <p className="text-smartasset-blue-dark">
                    <span className="font-semibold">Monthly:</span> {formatCurrency(calculationResults.monthly)}
                  </p>
                </div>
                
                {isAuthenticated && (
                  <div className="mt-6">
                    <Button 
                      className="w-full flex items-center justify-center bg-smartasset-blue hover:bg-smartasset-blue-dark"
                      onClick={async () => {
                        if (!calculationResults) return;
                        
                        setIsSaving(true);
                        try {
                          const result = await saveTaxCalculation({
                            type: 'income-tax',
                            income,
                            filingStatus,
                            state,
                            federalTax: calculationResults.federalTax,
                            stateTax: calculationResults.stateTax
                          });
                          
                          if (result.success) {
                            toast({
                              title: "Calculation saved",
                              description: "Your tax calculation has been saved to your profile.",
                            });
                          } else {
                            toast({
                              title: "Save failed",
                              description: "Failed to save calculation.",
                              variant: "destructive",
                            });
                          }
                        } catch (error) {
                          toast({
                            title: "Save error",
                            description: "An error occurred while saving. Please try again.",
                            variant: "destructive",
                          });
                        } finally {
                          setIsSaving(false);
                        }
                      }}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Calculation
                        </>
                      )}
                    </Button>
                  </div>
                )}
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full" onClick={() => setShowResults(false)}>
                    Edit Values
                  </Button>
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
          </CardContent>
          <CardFooter className="text-sm text-gray-500 flex flex-col items-start">
            <p>
              Note: This is a simplified tax calculator for demonstration purposes. Actual tax calculations 
              may vary based on deductions, credits, and other factors.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TaxCalculator;
