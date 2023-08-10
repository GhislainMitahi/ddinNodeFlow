const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const apiEndpoint_level_1 = process.env.APILEVELONE_LOGIN;

const userLoginController = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {

    const ErrorDate = error.response.headers

    const errResponse = {
       responseCode: error.response?.status || 500,
       codeDescription: "An error occurred.",
       communicationStatus: "FAILURE",
       data: error.response?.data || "Internal Server Error",
       metadata: "",
       responseDate: new Date().toLocaleString(),
    }
    console.error('Error during API request:', errResponse);
    return res.status(401).json(errResponse);
    }

    const base64Credentials = authHeader.split(' ')[1];

    // const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');

    // const [username, password] = credentials.split(':');

    const authHeaderForAPI = {
      Authorization: `Basic ${base64Credentials}`,
    };

    const response = await axios.get(apiEndpoint_level_1, { headers: authHeaderForAPI });

    const userInfo = {
      responseCode: "",
     codeDescription: "SUCCESS",
     communicationStatus: "EXIST",
     data: {
      id: "",
      name: "",
      username: "",
      email: "",
      image: "",
      country: "",
      nationalId: "",
      birthday: "",
      gender: "",
      city: "",
      province: "",
      district: "",
      sector: "",
      phone: "",
      agentCategory: "",
      agentFloatAccountId: null,
      agentInstantCommissionAccountId: null,
      agentDelayedCommissionAccountId: null
  },
    }
    
    userInfo.responseCode = response.status;
    userInfo.data.id =  response.data.id;
    userInfo.data.name =  response.data.name;
    userInfo.data.username =  response.data.username; 
    userInfo.data.username =  response.data.username; 
    userInfo.data.email =  response.data.email;
    userInfo.data.image =  response.data.images[0].fullUrl;

    userInfo.data.country = response.data.customValues.find(
      (cv) => cv.internalName === "country"
    ).value
    userInfo.data.nationalId = response.data.customValues.find(
      (cv) => cv.internalName === "national_id"
    ).value
    userInfo.data.birthday = response.data.customValues.find(
      (cv) => cv.internalName === "birthday"
    ).value
    userInfo.data.gender = response.data.customValues.find(
  (cv) => cv.internalName === "gender"
).value
userInfo.data.city =  response.data.customValues.find(
  (cv) => cv.internalName === "city"
).value
userInfo.data.province = response.data.customValues.find(
  (cv) => cv.internalName === "area"
).value
userInfo.data.district = response.data.customValues.find(
  (cv) => cv.internalName === "district"
).value
userInfo.data.sector = response.data.customValues.find(
  (cv) => cv.internalName === "sector"
).value

userInfo.data.phone = response.data.customValues.find(
  (cv) => cv.internalName === "Phone_User_ID"
).value
userInfo.data.agentCategory = response.data.customValues.find(
  (cv) => cv.internalName === "agent_category"
).value

res.status(200).json(userInfo);
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
};

module.exports = userLoginController;
