function validationData(req, res, next) {
    const requiredFields = [
      "amount", "description", "currencySymbol", "transferTypeId", "toMemberId",
      "firstName", "lastName", "mobile", "isPersonal", "clientEmail"
    ];
  
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is missing in the data` });
      }
    }
    next();
  }

  module.exports = { validationData };