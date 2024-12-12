const ApiKeyRepository = require("../../models/repository/api-key_repository");

class ApiKeyService {
  constructor(ApiKeyRepository) {
    this.ApiKeyRepository = ApiKeyRepository;
  }

  getApiKeyList = async (userRole, deviceUserId, size, page) => {
    try {
      const limit = size ? parseInt(size) : 10;
      const offset = page ? (parseInt(page) - 1) * limit : 0;

      let data, totalData;

      if (userRole === "admin") {
        totalData = await this.ApiKeyRepository.countDataAdmin();
        data = await this.ApiKeyRepository.getApiKeyListForAdmin(limit, offset);
      } else {
        totalData = await this.ApiKeyRepository.countDataUser(deviceUserId);
        data = await this.ApiKeyRepository.getApiKeyListForUser(deviceUserId, limit, offset);
      }

      return {
        totalItems: totalData,
        currentPage: page ? parseInt(page) : 1,
        totalPages: Math.ceil(totalData / limit),
        data,
      };
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
