// server.js (or app.js)
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const { getFeeStructureFromSheet } = require('./googleSheetsAPI');

const fetchFeeStructureFromSpreadsheet = async () => {
  try {
    return await getFeeStructureFromSheet();
  } catch (error) {
    console.error('Error fetching fee structure:', error);
    throw new Error('Failed to fetch fee structure');
  }
};

app.get('/api/v1/profitability-calculator', async (req, res) => {
  try {
    const feeStructure = await fetchFeeStructureFromSpreadsheet();
    res.json(feeStructure);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch fee structure' });
  }
});

app.post('/api/v1/profitability-calculator', express.json(), async (req, res) => {
    const { category, price, weight, mode, serviceLevel, location, size } = req.body;
    
    // Validate required fields
    if (!category || !price || !weight || !mode || !serviceLevel || !location || !size) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
  try {
    const feeStructure = await fetchFeeStructureFromSpreadsheet();
    res.json(feeStructure);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch fee structure' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
