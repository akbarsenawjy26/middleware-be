const repository = require("../../models/repository/api-key_repository");
const moment = require("moment");
const generateApiKey = require("../../../utils/generate_api_utils");

class ApiKeyService {
  constructor(generateApiKey, repository) {
    this.generateApiKey = generateApiKey;
    this.repository = repository;
  }

  create = async (userId, deviceUserId, expires_at, note, projectId) => {
    try {
      let expiryDate = moment(expires_at).format("YYYY-MM-DD HH:mm:ss");
      const apiKey = await this.generateApiKey.generateApiKey(userId);

      const data = await this.repository.create(apiKey, deviceUserId, expiryDate, note, projectId);

      return data;
    } catch (error) {
      throw new Error(`Error Creating API Key In Service Layer: ${error.message}`);
    }
  };
}

module.exports = new ApiKeyService(generateApiKey, repository);
