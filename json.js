const jsonExperted = {
        "responseCode": "200",
        "codeDescription": "SUCCESS",
        "communicationStatus": "EXIST",
        "data": {
            "id": "5",
            "name": "HATEGEKIMANA Jean Paul",
            "username": "jphategeka",
            "email": "jphategeka@gmail.com",
            "image": "http://test.ddin.rw:80/coretest/image?id=52",
            "country": "Rwanda",
            "nationalId": "120008009201823",
            "birthday": "01/07/2000",
            "gender": "Male",
            "city": "Kigali",
            "province": null,
            "district": "Kicukiro",
            "sector": "Kicukiro",
            "phone": null,
            "agentCategory": "Agent",
            "agentFloatAccountId": null,
            "agentInstantCommissionAccountId": null,
            "agentDelayedCommissionAccountId": null
        },
        "metadata": null,
        "responseDate": "20230806141110"
    }

const jsonDone = {
    "amount": "2000",
    "currencySymbol": "Rwf",
    "customValues": [
        {
            "fieldId": "45",
            "internalName": "client_firstname",
            "value": "Ghislain"
        },
        {
            "fieldId": "46",
            "internalName": "client_lastname",
            "value": "Mitahi"
        },
        {
            "fieldId": "47",
            "internalName": "agent_id",
            "value": "jphategeka"
        },
        {
            "fieldId": "48",
            "internalName": "phone_number",
            "value": "250703900930"
        },
        {
            "fieldId": "49",
            "internalName": "national_id_number",
            "value": "1234567890989098"
        },
        {
            "fieldId": "50",
            "internalName": "password_number",
            "value": ""
        },
        {
            "fieldId": "51",
            "internalName": "referral_code",
            "value": "DDIN@250"
        },
        {
            "fieldId": "52",
            "internalName": "mpost_client_id",
            "value": "62348"
        },
        {
            "fieldId": "53",
            "internalName": "mpost_system_metadata",
            "value": ""
        },
        {
            "fieldId": "54",
            "internalName": "client_surname",
            "value": "testsurname"
        },
        {
            "fieldId": "57",
            "internalName": "isPersonal",
            "value": true
        },
        {
            "fieldId": "56",
            "internalName": "npoCodeId",
            "value": "testsurname"
        },
        {
            "fieldId": "57",
            "internalName": "client_email",
            "value": "ghislai888ahi@gmail.com"
        }
    ],
    "description": "NPO Client Registration Through DDIN Agent ID:jphategeka,Client Data:Firstname:Ghislain,Lastname:Mitahi,Client Mobile:+250703900930,Identity Type:PASSPORT,Identity Number:787878787878,Postal Code:00100,Middle name:hghg,Client Type:true,Client Email:ghislai888ahi@gmail.com",
    "toMemberId": "21",
    "transferTypeId": "42"
}

  const dataErrFormatExpected = {
      "responseCode": "400",
      "codeDescription": "Authentication failed. Username /password is incorrect. Please try again with correct credentials.",
      "communicationStatus": "FAILURE",
      "data": "{\"errorCode\":\"INVALID_CREDENTIALS\",\"errorDetails\":\"Invalid username / password\"}",
      "metadata": null,
      "responseDate": "20230806141347"
  }

  const dataErrFormatGot = {
    responseCode: 400,
    codeDescription: 'Authentication failed. Username /password is incorrect. Please try again with correct credentials.',
    communicationStatus: 'FAILURE',
    data: {
      errorCode: 'INVALID_CREDENTIALS',
      errorDetails: 'Invalid username / password'
    }
}