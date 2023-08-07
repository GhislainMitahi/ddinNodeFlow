const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const apiEndpoint_level_1 = process.env.APILEVELONE_LOGIN;

const userLoginController = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
    //   {
    //     "responseCode": "400",
    //     "codeDescription": "Authentication failed. Username /password is incorrect. Please try again with correct credentials.",
    //     "communicationStatus": "FAILURE",
    //     "data": "{\"errorCode\":\"INVALID_CREDENTIALS\",\"errorDetails\":\"Invalid username / password\"}",
    //     "metadata": null,
    //     "responseDate": "20230806141347"
    // }
      return res.status(401).json({ error: 'Unauthorized' });
    }

    


    const base64Credentials = authHeader.split(' ')[1];

    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');

    const [username, password] = credentials.split(':');

    const authHeaderForAPI = {
      Authorization: `Basic ${base64Credentials}`,
    };

    const response = await axios.get(apiEndpoint_level_1, { headers: authHeaderForAPI });

    // const userInfo = response.data;

    console.log("Here is the data we are excepted to pass back to the Agent App", response)

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

console.log("Hello there: ", response.data.customValues)

console.log("Let's see what we can get at the end of format",userInfo)


   
  //   {
  //     "responseCode": "200",
  //     "codeDescription": "SUCCESS",
  //     "communicationStatus": "EXIST",
  //     "data": {
  //         "id": "5",
  //         "name": "HATEGEKIMANA Jean Paul",
  //         "username": "jphategeka",
  //         "email": "jphategeka@gmail.com",
  //         "image": "http://test.ddin.rw:80/coretest/image?id=52",
  //         "country": "Rwanda",
  //         "nationalId": "120008009201823",
  //         "birthday": "01/07/2000",
  //         "gender": "Male",
  //         "city": "Kigali",
  //         "province": null,
  //         "district": "Kicukiro",
  //         "sector": "Kicukiro",
  //         "phone": null,
  //         "agentCategory": "Agent",
  //         "agentFloatAccountId": null,
  //         "agentInstantCommissionAccountId": null,
  //         "agentDelayedCommissionAccountId": null
  //     },
  //     "metadata": null,
  //     "responseDate": "20230806141110"
  // }
  console.log("Here is the ID ", response.data.id)
    res.status(200).json(userInfo);
  } catch (error) {
  //   {
  //     "responseCode": "400",
  //     "codeDescription": "Authentication failed. Username /password is incorrect. Please try again with correct credentials.",
  //     "communicationStatus": "FAILURE",
  //     "data": "{\"errorCode\":\"INVALID_CREDENTIALS\",\"errorDetails\":\"Invalid username / password\"}",
  //     "metadata": null,
  //     "responseDate": "20230806141347"
  // }
    console.error('Error during user login:', error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'User login failed' });
  }
};

module.exports = userLoginController;
