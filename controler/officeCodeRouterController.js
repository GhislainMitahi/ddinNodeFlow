const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const officeCodeRouterControler = async (req, res, next) => {
   try {

      const api_level_1_codeoffice = process.env.URL_OFFICE_CODE
      const api_key = process.env.API_KEY

      const response = await axios.get(api_level_1_codeoffice, {
        headers: { "api-key": api_key },
      });

      const responseData = response.data;

      const responseDataFormated = {
        codeDescription: "SUCCESS",
      communicationStatus: "EXIST",
      metadata: null,
      responseCode: response.status,
      responseDate: new Date().toLocaleString(),
      data:responseData.map(item => ({
        name: item.name,
        postal_code: item.postal_code
      }))
      }

      res.status(200).json(responseDataFormated);

    } catch (error) {
        const errResponse = {
           responseCode: error.response?.status || 500,
           codeDescription: "An error occurred.",
           communicationStatus: "FAILURE",
           data: error.response?.data || "Internal Server Error",
           metadata: "",
           responseDate: new Date().toLocaleString(),
        };
        console.error('Error during API request:', errResponse);
        res.status(errResponse.responseCode).json(errResponse);
     }
}

module.exports = officeCodeRouterControler;

