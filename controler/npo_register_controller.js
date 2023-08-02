const axios = require("axios");

const npoRegisterController = async (req, res, next) => {
  try {
    const api_key = "bf30616e-5be7-4310-b1f7-7da752a51d3f";
    const name = "mposte";
    const password = "mposte@250!";
    const url =
      "https://test.ddin.rw/coretest/rest/payments/confirmMemberPayment";

    const mpPosteApiResponse = await axios.post(
      "https://www.mpost-app.co.ke/api/client/virtual-addresses",
      req.body,
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
      amount: "2000",
      description:
        "MPOSTE Client Registration Commission Declaration(API LEVEL 1)",
      currencySymbol: "Rwf",
      transferTypeId: "42",
      toMemberId: "21",
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

    console.log("----->", apiL1Body);
    const jsonapiL1Body = JSON.stringify(apiL1Body);
    console.log("hellllloooooooo ========>>> json ",jsonapiL1Body);

    const basicToken = Buffer.from(`${name}:${password}`).toString("base64");
    const headers = {
      Authorization: `Basic ${basicToken}`,
      "Content-Type": "application/json",
    };

    const cyclosApiResponse = await axios.post(url, jsonapiL1Body, {
      headers,
    });

    const transactionID = cyclosApiResponse.data.id;
    console.log(
      "-------------------------------->>>>>>>>>>>>>> transation id",
      transactionID
    );

    res.json({
      transactionID,
      clientID,
      message: "Registration successful!",
    });
  } catch (error) {
    console.error("Error during API integration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = npoRegisterController;
