const repository = require("../../models/repository/api-key_repository");
const moment = require("moment");

class ApiKeyService {
  constructor(repository) {
    this.repository = repository;
  }

  update = async (guid, note, expires_at, userRole, projetId, userId) => {
    try {
      let expiryDate = moment(expires_at).format("YYYY-MM-DD HH:mm:ss");

      const apikey = await this.repository.getByGuid(guid);
      if (!apikey) return { success: false, message: "Api Key Not Found" };

      let data;
      if (userRole === "admin") {
        data = await this.repository.updateForAdmin(guid, note, expiryDate, projetId);
      } else {
        if (userId !== apikey.userId) {
          return { success: false, message: "Access Denied" };
        }

        data = await this.repository.updateForUser(guid, note, expiryDate, projetId, userId);
      }
      return data;
    } catch (error) {
      throw new Error(`Error Updating API Key In Service Layer: ${error.message}`);
    }
  };
}

module.exports = new ApiKeyService(repository);
