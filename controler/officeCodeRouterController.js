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
        responseCode : error.response.status,
        codeDescription : "Authentication failed. Username /password is incorrect. Please try again with correct credentials.",
        communicationStatus : "FAILURE",
        data : error.response.data,
        metadata : "",
        responseDate: ErrorDate.date
      }
      console.error('Error during user login:', errResponse);
      res.status(errResponse ? error.response.status : 500).json({ error: "Internal Server Error" });
   }
}

module.exports = officeCodeRouterControler;

