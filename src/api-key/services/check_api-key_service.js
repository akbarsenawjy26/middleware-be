const apiKeyRepository = require("../../models/repository/api-key_repository");

class ApiKeyService {
  constructor(apiKeyRepository) {
    this.apiKeyRepository = apiKeyRepository;
  }

  checkApiKey = async (apiKey) => {
    try {
      const data = await this.apiKeyRepository.checkApiKey(apiKey);
      if (!data) {
        return null;
      }
      console.log(data);
      return data;
    } catch (error) {
      throw new Error(`Error Fetching API Key: ${error.message}`);
    }
  };
}

module.exports = new ApiKeyService(apiKeyRepository);
