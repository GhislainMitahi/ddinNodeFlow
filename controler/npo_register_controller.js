const axios = require('axios');

async function npoRegisterController(req, res) {
  try {
    const collectedData = req.body;

    const mpPosteApiResponse = await axios.post('https://mposte-api.example.com/endpoint', collectedData);
    const clientID = mpPosteApiResponse.data.clientID;

    const cyclosApiResponse = await axios.post('https://cyclos-api.example.com/commission', {
      clientID,
      commissionAmount: 2000,
    });
    const transactionID = cyclosApiResponse.data.transactionID;

    res.json({
      transactionID,
      clientID,
      message: 'Registration successful!',
    });
  } catch (error) {
    console.error('Error during API integration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { npoRegisterController };