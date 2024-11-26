const apiKeyModel = require("../../models/api-key_models");
const moment = require("moment");
const generateApiKey = require("../../../utils/generate_api_utils");

const createApiKey = async (userId, deviceUserId, expires_at, statusApi, note) => {
  try {
    let expiryDate = null;

    switch (expires_at) {
      case "3 hari":
        expiryDate = moment().add(3, "days").toDate();
        break;
      case "7 hari":
        expiryDate = moment().add(7, "days").toDate();
        break;
      case "1 bulan":
        expiryDate = moment().add(1, "months").toDate();
        break;
      case "3 bulan":
        expiryDate = moment().add(3, "months").toDate();
        break;
      case "1 tahun":
        expiryDate = moment().add(1, "years").toDate();
        break;
      case "never":
        expiryDate = null;
        break;
      default:
        throw new Error("Input tidak valid");
    }

    const apiKey = await generateApiKey.generateApiKey(userId);
    console.log("user Guid:", userId);
    console.log("Api Key:", apiKey);

    const data = await apiKeyModel.create({
      api_key: apiKey,
      userId: deviceUserId,
      expires_at: expiryDate,
      status: statusApi,
      note: note,
    });

    return data;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

module.exports = { createApiKey };
