const apiKeyModel = require("../../models/api-key_models");
const { Op } = require("sequelize");
const moment = require("moment");
const ApiKeyRepository = require("../../models/repository/api-key_repository");

class ApiKeyService {
  constructor(ApiKeyRepository) {
    this.ApiKeyRepository = ApiKeyRepository;
  }

  updateApiKey = async (guid, note, expires_at, userRole, userId) => {
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

      const apikey = await this.ApiKeyRepository.getApiKeyByGuid(guid);
      if (!apikey) return { success: false, message: "apikey not found" };

      let data;
      if (userRole === "admin") {
        data = await this.ApiKeyRepository.updateApiKeyForAdmin(guid, note, expiryDate);
      } else {
        if (userId !== apikey.userId) {
          return { success: false, message: "access denied" };
        }

        data = await this.ApiKeyRepository.updateApiKeyForUser(guid, note, expiryDate, userId);
      }
      return data;
    } catch (error) {
      throw new Error(`Error Updating API Key: ${error.message}`);
    }
  };
}

module.exports = new ApiKeyService(ApiKeyRepository);
