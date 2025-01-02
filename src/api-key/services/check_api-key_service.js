// const repository = require("../../models/repository/api-key_repository");
const repository = require("../../repository/api-key_repository");

class ApiKeyService {
  constructor(repository) {
    this.repository = repository;
  }

  checkApiKey = async (apiKey) => {
    try {
      const data = await this.repository.checkApiKey(apiKey);
      if (!data) {
        return null;
      }

      return data;
    } catch (error) {
      throw new Error(`Error Checking API Key In Service: ${error.message}`);
    }
  };
}

module.exports = new ApiKeyService(repository);
