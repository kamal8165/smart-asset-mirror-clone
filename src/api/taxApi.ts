
// This is a mock API file to simulate backend functionality
// In a real application, this would connect to a backend server

// Tax bracket data for 2023
export const federalTaxBrackets = {
  single: [
    { rate: 0.10, upTo: 11000 },
    { rate: 0.12, upTo: 44725 },
    { rate: 0.22, upTo: 95375 },
    { rate: 0.24, upTo: 182100 },
    { rate: 0.32, upTo: 231250 },
    { rate: 0.35, upTo: 578125 },
    { rate: 0.37, upTo: Infinity },
  ],
  married: [
    { rate: 0.10, upTo: 22000 },
    { rate: 0.12, upTo: 89450 },
    { rate: 0.22, upTo: 190750 },
    { rate: 0.24, upTo: 364200 },
    { rate: 0.32, upTo: 462500 },
    { rate: 0.35, upTo: 693750 },
    { rate: 0.37, upTo: Infinity },
  ],
  head: [
    { rate: 0.10, upTo: 15700 },
    { rate: 0.12, upTo: 59850 },
    { rate: 0.22, upTo: 95350 },
    { rate: 0.24, upTo: 182100 },
    { rate: 0.32, upTo: 231250 },
    { rate: 0.35, upTo: 578100 },
    { rate: 0.37, upTo: Infinity },
  ],
};

// State tax rates (simplified)
export const stateTaxRates = {
  ca: { name: "California", rate: 0.093 },
  ny: { name: "New York", rate: 0.0882 },
  tx: { name: "Texas", rate: 0 },
  fl: { name: "Florida", rate: 0 },
  il: { name: "Illinois", rate: 0.0495 },
  wa: { name: "Washington", rate: 0 },
  nj: { name: "New Jersey", rate: 0.1075 },
  oh: { name: "Ohio", rate: 0.0399 },
  pa: { name: "Pennsylvania", rate: 0.0307 },
  ga: { name: "Georgia", rate: 0.0575 },
};

// Calculate federal income tax
export const calculateFederalTax = async (income: number, filingStatus: string): Promise<number> => {
  // Simulate API call with delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const brackets = federalTaxBrackets[filingStatus as keyof typeof federalTaxBrackets];
      let tax = 0;
      let remainingIncome = income;

      for (let i = 0; i < brackets.length; i++) {
        const bracket = brackets[i];
        const prevBracket = i > 0 ? brackets[i - 1].upTo : 0;
        const taxableInBracket = Math.min(remainingIncome, bracket.upTo - prevBracket);
        
        if (taxableInBracket <= 0) break;
        
        tax += taxableInBracket * bracket.rate;
        remainingIncome -= taxableInBracket;
      }

      resolve(tax);
    }, 500); // 500ms delay to simulate network request
  });
};

// Calculate state income tax
export const calculateStateTax = async (income: number, stateCode: string): Promise<number> => {
  // Simulate API call with delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const stateData = stateTaxRates[stateCode as keyof typeof stateTaxRates];
      const rate = stateData ? stateData.rate : 0;
      resolve(income * rate);
    }, 300); // 300ms delay to simulate network request
  });
};

// Get full tax calculation
export const getFullTaxCalculation = async (income: number, filingStatus: string, stateCode: string) => {
  try {
    // Calculate taxes (parallel API calls)
    const [federalTax, stateTax] = await Promise.all([
      calculateFederalTax(income, filingStatus),
      calculateStateTax(income, stateCode)
    ]);

    const totalTax = federalTax + stateTax;
    const effectiveRate = (totalTax / income) * 100;
    const takeHomePay = income - totalTax;

    return {
      income,
      federalTax,
      stateTax,
      totalTax,
      effectiveRate,
      takeHomePay,
      monthly: takeHomePay / 12
    };
  } catch (error) {
    console.error("Error calculating taxes:", error);
    throw new Error("Failed to calculate taxes");
  }
};

// Get all available states
export const getAvailableStates = (): Promise<Array<{ code: string; name: string }>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const states = Object.entries(stateTaxRates).map(([code, data]) => ({
        code,
        name: data.name
      }));
      resolve(states);
    }, 300);
  });
};

// User related functions (for authentication simulation)
export const loginUser = async (email: string, password: string) => {
  // This would actually validate credentials against a database in a real app
  return new Promise<{success: boolean, token?: string, error?: string}>((resolve) => {
    setTimeout(() => {
      // Simulate successful login for demo@example.com with password "password"
      if (email === "demo@example.com" && password === "password") {
        resolve({
          success: true,
          token: "sample-jwt-token-would-be-here"
        });
      } else {
        resolve({
          success: false,
          error: "Invalid email or password"
        });
      }
    }, 800);
  });
};

export const registerUser = async (email: string, password: string, name: string) => {
  // This would create a new user in the database in a real app
  return new Promise<{success: boolean, token?: string, error?: string}>((resolve) => {
    setTimeout(() => {
      // Always succeed for demo purposes
      resolve({
        success: true,
        token: "sample-jwt-token-for-new-user"
      });
    }, 1000);
  });
};

export const getUserProfile = async (token: string) => {
  // This would fetch the user's profile from the database using the token
  return new Promise<{name: string, email: string, savedCalculations: any[]}>((resolve) => {
    setTimeout(() => {
      // Return mock user data
      resolve({
        name: "Demo User",
        email: "demo@example.com",
        savedCalculations: [
          {
            id: 1,
            type: "income-tax",
            income: 75000,
            filingStatus: "single",
            state: "ca",
            federalTax: 12578,
            stateTax: 6975,
            date: "2023-04-15"
          }
        ]
      });
    }, 600);
  });
};

// Save a tax calculation to user profile
export const saveTaxCalculation = async (
  token: string, 
  calculationData: {
    type: string;
    income: number;
    filingStatus: string;
    state: string;
    federalTax: number;
    stateTax: number;
  }
) => {
  // This would save the calculation to the user's profile in the database
  return new Promise<{success: boolean, id: number}>((resolve) => {
    setTimeout(() => {
      // Always succeed for demo purposes
      resolve({
        success: true,
        id: Math.floor(Math.random() * 1000) + 1 // Random ID
      });
    }, 700);
  });
};
