const ApiKeyRepository = require("../../models/repository/api-key_repository");

class ApiKeyService {
  constructor(ApiKeyRepository) {
    this.ApiKeyRepository = ApiKeyRepository;
  }

  getApiKeyList = async (userRole, deviceUserId) => {
    try {
      let data;
      if (userRole === "admin") {
        data = await this.ApiKeyRepository.getApiKeyListForAdmin();
      } else {
        data = await this.ApiKeyRepository.getApiKeyListForUser(deviceUserId);
      }

      return data;
    } catch (error) {
      throw new Error(`Error Fetching API Key: ${error.message}`);
    }
  };

  getApiKeyByGuid = async (guid, userRole, userId) => {
    try {
      const apiKey = await this.ApiKeyRepository.getApiKeyByGuid(guid);
      if (!apiKey) return { success: false, message: "api key not found" };

      let data;
      if (userRole === "admin") {
        data = await this.ApiKeyRepository.getApiKeyByGuidForAdmin(guid);
      } else {
        data = await this.ApiKeyRepository.getApiKeyByGuidForUser(guid, userId);
      }

      return data;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  };
}

module.exports = new ApiKeyService(ApiKeyRepository);
