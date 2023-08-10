const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const npoRegisterController = async (req, res, next) => {
  try {
const dataBody = req.body;

const npo_to_register_data = {
  postal_code_id: "",
is_personal: "",
user:{
          first_name :"",
          last_name : "",
          middle_name:"",
          mobile :"",
          email: "",
          national_id_number: "",
          passport_number: "",
          password:""
    }};

    npo_to_register_data.postal_code_id = dataBody.postalCodeId;
    npo_to_register_data.is_personal = dataBody.isPersonal;
    npo_to_register_data.user.first_name = dataBody.firstName;
    npo_to_register_data.user.last_name = dataBody.lastName;
    npo_to_register_data.user.middle_name = dataBody.middleName;
    npo_to_register_data.user.mobile = dataBody.mobile;
    npo_to_register_data.user.email = dataBody.clientEmail;
    npo_to_register_data.user.national_id_number = dataBody.nationalIdNumber;
    npo_to_register_data.user.passport_number = dataBody.passportNumber;
    npo_to_register_data.user.password = "";

    const api_key = process.env.API_KEY;
    const name = process.env.MPOST_NAME;
    const password = process.env.MPOST_PASSWORD;
    const url_core_test = process.env.URL_CORE_TEST;
    const url_mpost = process.env.URL_MPOST;

    const mpPosteApiResponse = await axios.post(
      url_mpost,
      npo_to_register_data,
      {
        headers: { "api-key": api_key },
      }
    );

    const clientID = mpPosteApiResponse.data.user.id;
    const firstName = mpPosteApiResponse.data.user.first_name;
    const lastName = mpPosteApiResponse.data.user.last_name;
    const mobile = mpPosteApiResponse.data.user.mobile;
    const email = mpPosteApiResponse.data.user.email;

    const apiL1Body = {
      customValues: [
        {
          internalName: "client_firstname",
          value: "Mposte Client Firstname",
          fieldId: "45",
        },
        {
          internalName: "client_lastname",
          value: "Mposte Client Lastname",
          fieldId: "46",
        },
        {
          internalName: "agent_id",
          value: "jphategeka",
          fieldId: "47",
        },
        {
          internalName: "phone_number",
          value: "+250789292415",
          fieldId: "48",
        },
        {
          internalName: "national_id_number",
          value: "1234567890989098",
          fieldId: "49",
        },
        {
          internalName: "password_number",
          value: "",
          fieldId: "50",
        },
        {
          internalName: "referral_code",
          value: "DDIN@250",
          fieldId: "51",
        },
        {
          internalName: "mpost_client_id",
          value: "1234569890",
          fieldId: "52",
        },
        {
          internalName: "mpost_system_metadata",
          value: "",
          fieldId: "53",
        },

        {
          internalName: "client_surname",
          value: "testsurname",
          fieldId: "54",
        },
        {
          internalName: "isPersonal",
          value: true,
          fieldId: "57",
        },
        {
          internalName: "npoCodeId",
          value: "testsurname",
          fieldId: "56",
        },
        {
          internalName: "client_email",
          value: "testsurname",
          fieldId: "57",
        },
      ],
    };

    apiL1Body.amount = dataBody.amount;
    apiL1Body.description = dataBody.description;
    apiL1Body.currencySymbol = dataBody.currencySymbol;
    apiL1Body.transferTypeId = dataBody.transferTypeId;
    apiL1Body.toMemberId = dataBody.toMemberId;
    apiL1Body.customValues.find(
      (cv) => cv.internalName === "mpost_client_id"
    ).value = clientID.toString();
    apiL1Body.customValues.find(
      (cv) => cv.internalName === "client_firstname"
    ).value = firstName;
    apiL1Body.customValues.find(
      (cv) => cv.internalName === "client_lastname"
    ).value = lastName;
    apiL1Body.customValues.find(
      (cv) => cv.internalName === "phone_number"
    ).value = mobile;
    apiL1Body.customValues.find(
      (cv) => cv.internalName === "client_email"
    ).value = email;
  
    const jsonapiL1Body = JSON.stringify(apiL1Body);

    const basicToken = Buffer.from(`${name}:${password}`).toString("base64");
    const headers = {
      Authorization: `Basic ${basicToken}`,
      "Content-Type": "application/json",
    };

    const cyclosApiResponse = await axios.post(url_core_test, jsonapiL1Body, {
      headers,
    });

    const transactionID = cyclosApiResponse.data.id;

    res.json({
      transactionID,
      clientID,
      message: "Registration successful!",
    });
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
};

module.exports = npoRegisterController;
