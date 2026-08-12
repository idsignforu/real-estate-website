import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Calculator } from 'lucide-react';

export const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000000); // Default 50 Lakhs
  const [interestRate, setInterestRate] = useState(8.5); // Default 8.5%
  const [loanTenure, setLoanTenure] = useState(20); // Default 20 Years

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const principal = loanAmount;
    const ratePerMonth = interestRate / 12 / 100;
    const numberOfMonths = loanTenure * 12;

    if (ratePerMonth === 0) {
      const monthlyEMI = principal / numberOfMonths;
      setEmi(monthlyEMI);
      setTotalInterest(0);
      setTotalAmount(principal);
    } else {
      const emiValue =
        (principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfMonths)) /
        (Math.pow(1 + ratePerMonth, numberOfMonths) - 1);
      const totalAmountValue = emiValue * numberOfMonths;
      const totalInterestValue = totalAmountValue - principal;

      setEmi(emiValue);
      setTotalInterest(totalInterestValue);
      setTotalAmount(totalAmountValue);
    }
  }, [loanAmount, interestRate, loanTenure]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="w-full shadow-lg border border-gray-200">
      <CardHeader className="bg-blue-900 text-white rounded-t-xl py-4 px-6">
        <CardTitle className="flex items-center text-xl sm:text-2xl font-bold">
          <Calculator className="h-6 w-6 mr-3 text-yellow-400" />
          Housing Loan EMI Calculator
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Sliders Column */}
          <div className="space-y-6">
            
            {/* Loan Amount */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-semibold text-gray-700">Loan Amount</Label>
                <span className="text-lg font-bold text-blue-900">{formatCurrency(loanAmount)}</span>
              </div>
              <Slider
                value={[loanAmount]}
                onValueChange={(val) => setLoanAmount(val[0])}
                min={500000}
                max={20000000}
                step={100000}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹5 Lakhs</span>
                <span>₹2 Crores</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-semibold text-gray-700">Interest Rate (p.a.)</Label>
                <span className="text-lg font-bold text-blue-900">{interestRate}%</span>
              </div>
              <Slider
                value={[interestRate]}
                onValueChange={(val) => setInterestRate(val[0])}
                min={6.5}
                max={15}
                step={0.1}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>6.5%</span>
                <span>15.0%</span>
              </div>
            </div>

            {/* Loan Tenure */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-semibold text-gray-700">Tenure (Years)</Label>
                <span className="text-lg font-bold text-blue-900">{loanTenure} Years</span>
              </div>
              <Slider
                value={[loanTenure]}
                onValueChange={(val) => setLoanTenure(val[0])}
                min={1}
                max={30}
                step={1}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>

          </div>

          {/* Results Summary Column */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col justify-between space-y-4">
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4 text-center sm:text-left">
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
                  Monthly Home Loan EMI
                </p>
                <p className="text-3xl font-extrabold text-blue-900">
                  {formatCurrency(emi)}
                </p>
              </div>

              <div className="space-y-2 pt-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Principal Amount:</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Total Interest Payable:</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between text-gray-900 font-bold text-base border-t border-gray-200 pt-2">
                  <span>Total Amount Payable:</span>
                  <span className="text-blue-900">{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 italic text-center sm:text-left">
              * Note: Calculated values are indicative. Actual bank interest rates may vary based on credit score &amp; loan sanction.
            </p>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};
