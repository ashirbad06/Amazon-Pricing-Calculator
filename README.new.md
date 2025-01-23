# Amazon Pricing Calculator

A React-based pricing calculator for Amazon sellers to estimate fees and profitability.

## Overview
This application helps sellers calculate various Amazon fees including referral fees, weight handling fees, closing fees, and pick & pack fees for FBA sellers. It provides real-time calculations based on product category, selling price, weight, and shipping preferences.

## Features
- Interactive pricing calculator with real-time updates
- Support for multiple product categories including:
  - Automotive (Helmets, Riding Gloves, Tyres, Rims, Vehicles)
  - Baby Products (Hardlines, Strollers, Diapers)
  - Books
- Comprehensive fee calculation including:
  - Referral Fees
  - Weight Handling Fees
  - Closing Fees
  - Pick & Pack Fees (for FBA)
- Multiple shipping modes (Easy Ship, FBA, Self Ship)
- Various service levels (Premium, Advanced, Standard, Basic)
- Location-based calculations (Local, Regional, National, IXD)
- Product size considerations (Standard, Heavy & Bulky)

## Setup

### Prerequisites
- Node.js v18 or higher
- npm or yarn package manager
- Modern web browser
- Text editor or IDE

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Project Structure
- `src/components/`: React components including PricingCalculator
- `src/data/`: Fee structure and constants
- `src/utils/`: Fee calculation utilities
- `src/types/`: TypeScript type definitions

## Component Architecture

### PricingCalculator Component
The main React component handles:
- Form input collection for:
  - Product category selection
  - Selling price in INR
  - Weight in kg
  - Shipping mode
  - Service level
  - Product size
  - Location
- Real-time fee calculations using utility functions
- Dynamic result display with fee breakdown
- Error handling and loading states

### Fee Calculation System
Core business logic implementation:
- `calculateReferralFee`: Category-specific percentage calculations
- `calculateWeightHandlingFee`: Shipping cost based on mode and weight
- `calculateClosingFee`: Fixed fees per category
- `calculatePickAndPackFee`: FBA-specific handling charges

## Fee Structure Details

### Referral Fee
- Category-specific percentage of selling price
- Varies by product type and category

### Weight Handling Fee
- Based on shipping mode (Easy Ship, FBA, Self Ship)
- Considers product weight and dimensions
- Varies by location (Local, Regional, National, IXD)
- Different rates for Standard vs Heavy & Bulky items

### Closing Fee
- Fixed fee based on product category
- Applied to all transactions

### Pick & Pack Fee
- Applicable only for FBA sellers
- Based on product size and handling requirements

## Technology Stack
- React 18.3.1
- TypeScript 5.5.3
- Tailwind CSS 3.4.1
- Vite 5.4.2
- Lucide React for icons

## Development Guide

### Adding New Features
1. For new fee types:
   - Add calculation logic in utils/feeCalculators.ts
   - Update PricingCalculator component
   - Add corresponding types if needed
2. For new product categories:
   - Add to categories array in PricingCalculator
   - Update fee calculation logic accordingly
3. For UI improvements:
   - Follow existing Tailwind CSS patterns
   - Maintain responsive design principles

### Best Practices
- Use TypeScript types for all data structures
- Maintain error handling throughout calculations
- Follow React hooks guidelines
- Keep components modular and reusable
- Document changes in code comments

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please ensure:
- Code follows TypeScript best practices
- All calculations are properly tested
- UI remains responsive and accessible
- Documentation is updated accordingly