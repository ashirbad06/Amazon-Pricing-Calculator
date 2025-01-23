# Amazon Pricing Calculator

## Prerequisites
- Node.js >= 18.18.0
- nvm (Node Version Manager)

## Setup

### Node.js Setup using NVM
If you don't have nvm installed, install it using:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
command -v nvm
```

Then install and use Node.js 18.17.0:
```bash
nvm install 18.17.0
nvm use 18.17.0
nvm alias default 18.17.0
```

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
npm install axios express
```

An interactive calculator for estimating Amazon seller fees and pricing strategies.

## Features
- Interactive pricing calculator with real-time updates
- Support for multiple product categories
- Detailed fee breakdown
- Profit margin analysis
- Historical pricing data integration
- Bulk calculation support

## Setup

The project requires Node.js (v14 or higher) and npm/yarn.

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Configure environment variables:
```bash
cp .env.example .env
```
4. Start development server:
```bash
npm run dev
```

## Component Architecture

### PricingCalculator Component
The main React component handles:
- User input validation
- Real-time calculations
- Fee structure updates
- State management
- API integration
- Results display

### Fee Calculation System
Core business logic implementation:
- Fee category determination
- Rate application
- Special case handling
- Discount calculations
- Tax considerations

## Fee Structure Details

The calculator supports various Amazon fee types:
- Referral fees (category-specific)
- FBA fees
- Storage fees
- Long-term storage fees
- Multi-channel fulfillment fees
- Special handling fees
- Return processing fees
- Subscription fees
- Closing fees for media items

## Technology Stack
- React 18.3.1
- TypeScript 4.9.5
- Vite
- TailwindCSS
- Jest for testing
- React Testing Library
- ESLint + Prettier

## Development Guide

### Adding New Features
1. For new fee types:
   - Add fee structure to `/src/data/fees`
   - Implement calculation logic in `/src/utils/calculations`
   - Update UI components in `/src/components`
2. For new product categories:
   - Define category in `/src/types`
   - Add validation rules
   - Update category selection component

### Best Practices
- Use TypeScript types for all data structures
- Write unit tests for all calculations
- Follow component composition patterns
- Maintain clean code principles
- Document all new features

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request