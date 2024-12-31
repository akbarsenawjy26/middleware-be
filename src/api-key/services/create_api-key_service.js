const repository = require("../../models/repository/api-key_repository");
const moment = require("moment");
const generateApiKey = require("../../../utils/generate_api_utils");
const dbExtraFunction = require("../../../utils/db_tx");

class ApiKeyService {
  constructor(generateApiKey, repository, dbExtraFunction) {
    this.generateApiKey = generateApiKey;
    this.repository = repository;
    this.dbExtraFunction = dbExtraFunction;
  }

  create = async (userId, deviceUserId, expires_at, note, projectId) => {
    try {
      let expiryDate = moment(expires_at).format("YYYY-MM-DD HH:mm:ss");
      const result = await this.dbExtraFunction.runTransaction(async (t) => {
        const apiKey = await this.generateApiKey.generateApiKey(userId);

        const data = await this.repository.create(apiKey, deviceUserId, expiryDate, note, projectId);

        return data;
      });
      return result;
    } catch (error) {
      throw new Error(`Error Creating API Key In Service Layer: ${error.message}`);
    }
  };
}

module.exports = new ApiKeyService(generateApiKey, repository, dbExtraFunction);
