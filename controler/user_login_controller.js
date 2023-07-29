const axios = require('axios');
const express = require('express');

const apiEndpoint_level_1 = "https://test.ddin.rw/coretest/rest/members/me";

const router = express.Router();

const userLoginController = async (req, res, next) => {
  try {
    // Get the Authorization header from the request headers (use lowercase 'authorization')
    const authHeader = req.headers.authorization;

    console.log(`here is it : ${authHeader}`);

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Extract the base64-encoded credentials from the Authorization header
    const base64Credentials = authHeader.split(' ')[1];

    // Decode the base64-encoded credentials to get the username and password
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');

    const [username, password] = credentials.split(':');

    console.log(`username is ${username} password is ${password}`);

    // Now you have the username and password, and you can use them to call the external API with Basic Authentication
    const authHeaderForAPI = {
      Authorization: `Basic ${base64Credentials}`,
    };

    // Send the GET request to the API endpoint with the authorization header
    const response = await axios.get(apiEndpoint_level_1, { headers: authHeaderForAPI });

    // If the API returns a successful response (e.g., status code 200), you can handle it here
    // For example, you can send a success response back to the frontend or perform any other necessary actions.
    const userInfo = response.data;
    // console.log(userInfo)
    res.status(200).json(userInfo);
    // res.render('index', { title: 'Express users' });
  } catch (error) {
    // If the API returns an error (e.g., status code 401 for unauthorized), you can handle it here
    // For example, you can send an error response back to the frontend or perform any other necessary actions.
    console.error('Error during user login:', error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'User login failed' });
  }
};

module.exports = userLoginController;
