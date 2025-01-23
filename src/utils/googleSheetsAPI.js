const { google } = require('googleapis');

// Configure Google Sheets API
async function getGoogleSheetsClient() {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',  // You'll need to add this file
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    const client = await auth.getClient();
    return google.sheets({ version: 'v4', auth: client });
}

async function getFeeStructureFromSheet() {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = '1o_yM63Grl_QB6lpuXE3spbrMeCs-hIMXCVyghj8FmV0';
    
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Sheet1!A:Z',  // Adjust range as needed
        });

        const rows = response.data.values;
        return transformSheetDataToFeeStructure(rows);
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        throw error;
    }
}

function transformSheetDataToFeeStructure(rows) {
    if (!rows || rows.length === 0) {
        throw new Error('No data found in the spreadsheet');
    }

    // Initialize the fee structure
    const feeStructure = {
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
    
    return feeStructure;
}

module.exports = {
    getFeeStructureFromSheet
};