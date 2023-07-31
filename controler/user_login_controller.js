const axios = require('axios');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const apiEndpoint_level_1 = process.env.APILEVELONE;

const userLoginController = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const base64Credentials = authHeader.split(' ')[1];

    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');

    const [username, password] = credentials.split(':');

    console.log(`username is ${username} password is ${password}`);

    const authHeaderForAPI = {
      Authorization: `Basic ${base64Credentials}`,
    };

    const response = await axios.get(apiEndpoint_level_1, { headers: authHeaderForAPI });

    const userInfo = response.data;
    res.status(200).json(userInfo);
  } catch (error) {
    console.error('Error during user login:', error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'User login failed' });
  }
};

module.exports = userLoginController;
