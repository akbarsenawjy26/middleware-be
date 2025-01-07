// const repository = require("../../models/repository/api-key_repository");
const repository = require("../../repository/api-key_repository");

class ApiKeyService {
  constructor(repository) {
    this.repository = repository;
  }

  delete = async (guid, userRole, deviceUserId) => {
    try {
      const apikey = await this.repository.getByGuid(guid);
      if (!apikey) return { success: false, message: "API Key Not Found" };

      let data;
      if (userRole === "admin") {
        data = await this.repository.deleteForAdmin(apikey.guid);
      } else {
        if (deviceUserId !== apikey.userId) {
          return { success: false, message: "Access Denied" };
        }
        data = await this.repository.deleteForUser(apikey.guid, deviceUserId);
      }
      return data;
    } catch (error) {
      throw new Error(`Error Deleting API Key In Service Layer: ${error.message}`);
    }
  };
}

module.exports = new ApiKeyService(repository);
