const ApiKeyRepository = require("../../models/repository/api-key_repository");
const moment = require("moment");
const generateApiKey = require("../../../utils/generate_api_utils");

class ApiKeyService {
  constructor(generateApiKey, ApiKeyRepository) {
    this.generateApiKey = generateApiKey;
    this.ApiKeyRepository = ApiKeyRepository;
  }

  createApiKey = async (userId, deviceUserId, expires_at, note, projectId) => {
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

      const apiKey = await this.generateApiKey.generateApiKey(userId);

      const data = await this.ApiKeyRepository.createApiKey(apiKey, deviceUserId, expiryDate, note, projectId);

      return data;
    } catch (error) {
      throw new Error(`Error Creating API Key: ${error.message}`);
    }
  };
}

module.exports = new ApiKeyService(generateApiKey, ApiKeyRepository);
