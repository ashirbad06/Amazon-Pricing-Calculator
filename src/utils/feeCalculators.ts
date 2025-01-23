import axios from 'axios';

const fetchFeeStructure = async (): Promise<any> => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/profitability-calculator');
    return response.data;
  } catch (error) {
    console.error('Error fetching fee structure:', error);
    // Return a default fee structure instead of throwing
    return {
      referralFees: {
        automotive: {
          helmetsAndGloves: [{ percentage: 15 }],
          tyresAndRims: [{ percentage: 15 }],
          vehicles: { percentage: 15 }
        },
        baby: {
          hardlines: [{ percentage: 15 }]
        },
        books: [{ percentage: 15 }]
      },
      weightHandlingFees: {
        easyShip: {
          standard: {
            first500g: { local: 30, regional: 40, national: 50, ixd: 60 },
            additional500gUpTo1kg: { local: 20, regional: 25, national: 30, ixd: 35 },
            additionalKgAfter1kg: { local: 15, regional: 20, national: 25, ixd: 30 },
            additionalKgAfter5kg: { local: 10, regional: 15, national: 20, ixd: 25 }
          },
          heavyBulky: {
            first12kg: { local: 140, regional: 160, national: 180, ixd: 200 },
            additionalKgAfter12kg: { local: 12, regional: 15, national: 18, ixd: 20 }
          }
        },
        fba: {
          standard: {
            premium: {
              first500g: 40,
              additional500gUpTo1kg: 25,
              additionalKgAfter1kg: 20,
              additionalKgAfter5kg: 15
            },
            standard: {
              first500g: 30,
              additional500gUpTo1kg: 20,
              additionalKgAfter1kg: 15,
              additionalKgAfter5kg: 10
            }
          }
        }
      }
    };
  }
};

export const calculateReferralFee = async (category: string, price: number): Promise<number> => {
  const feeStructure = await fetchFeeStructure();
  let applicableFeeStructure;

  if (category.startsWith('Automotive')) {
    if (category.includes('Helmets')) {
      applicableFeeStructure = feeStructure.referralFees.automotive.helmetsAndGloves;
    } else if (category.includes('Tyres')) {
      applicableFeeStructure = feeStructure.referralFees.automotive.tyresAndRims;
    } else if (category.includes('Vehicles')) {
      return price * (feeStructure.referralFees.automotive.vehicles.percentage / 100);
    }
  } else if (category.startsWith('Baby')) {
    applicableFeeStructure = feeStructure.referralFees.baby.hardlines;
  } else if (category === 'Books') {
    applicableFeeStructure = feeStructure.referralFees.books;
  }

  if (!applicableFeeStructure) return price * 0.15; // Default rate

  for (const tier of applicableFeeStructure) {
    if (('maxPrice' in tier && price <= tier.maxPrice) || 
        ('minPrice' in tier && price > tier.minPrice)) {
      return price * (tier.percentage / 100);
    }
  }

  return price * 0.15; // Default fallback
};

export const calculateWeightHandlingFee = async (
  mode: string,
  weight: number,
  serviceLevel: string,
  location: string,
  size: string
): Promise<number> => {
  const feeStructure = await fetchFeeStructure();
  if (mode === 'Easy Ship') {
    const fees = feeStructure.weightHandlingFees.easyShip;
    const sizeFees = size === 'Standard' ? fees.standard : fees.heavyBulky;

    if (size === 'Standard') {
      if (weight <= 0.5) {
        return sizeFees.first500g[location.toLowerCase()];
      } else if (weight <= 1) {
        return sizeFees.first500g[location.toLowerCase()] + 
               sizeFees.additional500gUpTo1kg[location.toLowerCase()];
      } else if (weight <= 5) {
        return sizeFees.first500g[location.toLowerCase()] +
               sizeFees.additional500gUpTo1kg[location.toLowerCase()] +
               (Math.ceil(weight - 1) * sizeFees.additionalKgAfter1kg[location.toLowerCase()]);
      } else {
        return sizeFees.first500g[location.toLowerCase()] +
               sizeFees.additional500gUpTo1kg[location.toLowerCase()] +
               (4 * sizeFees.additionalKgAfter1kg[location.toLowerCase()]) +
               (Math.ceil(weight - 5) * sizeFees.additionalKgAfter5kg[location.toLowerCase()]);
      }
    } else {
      if (weight <= 12) {
        return sizeFees.first12kg[location.toLowerCase()];
      } else {
        return sizeFees.first12kg[location.toLowerCase()] +
               (Math.ceil(weight - 12) * sizeFees.additionalKgAfter12kg[location.toLowerCase()]);
      }
    }
  }

  if (mode === 'FBA') {
    const fees = feeStructure.weightHandlingFees.fba.standard[serviceLevel.toLowerCase()];
    if (weight <= 0.5) return fees.first500g;
    if (weight <= 1) return fees.first500g + fees.additional500gUpTo1kg;
    if (weight <= 5) {
      return fees.first500g + fees.additional500gUpTo1kg +
             (Math.ceil(weight - 1) * fees.additionalKgAfter1kg);
    }
    return fees.first500g + fees.additional500gUpTo1kg +
           (4 * fees.additionalKgAfter1kg) +
           (Math.ceil(weight - 5) * fees.additionalKgAfter5kg);
  }

  return 0;
};

export const calculateClosingFee = async (category: string): Promise<number> => {
  return 20;
};

export const calculatePickAndPackFee = async (size: string): Promise<number> => {
  return size === 'Standard' ? 15 : 30;
};