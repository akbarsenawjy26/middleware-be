const ApiKeyRepository = require("../../models/repository/api-key_repository");

class ApiKeyService {
  constructor(ApiKeyRepository) {
    this.ApiKeyRepository = ApiKeyRepository;
  }

  deleteApiKey = async (guid, userRole, deviceUserId) => {
    try {
      const apikey = await this.ApiKeyRepository.getApiKeyByGuid(guid);
      if (!apikey) return { success: false, message: "API Key not found" };

      let data;
      if (userRole === "admin") {
        data = await this.ApiKeyRepository.deleteApiKeyForAdmin(guid);
      } else {
        if (deviceUserId !== apikey.userId) {
          return { success: false, message: "access denied" };
        }
        data = await this.ApiKeyRepository.deleteApiKeyForUser(guid, deviceUserId);
      }
      return data;
    } catch (error) {
      throw new Error(`Error Deleting API Key: ${error.message}`);
    }
  };
}

module.exports = new ApiKeyService(ApiKeyRepository);
