// const repository = require("../../models/repository/api-key_repository");
const repository = require("../../repository/api-key_repository");

const moment = require("moment");
const dbExtraFunction = require("../../../utils/db_tx");

class ApiKeyService {
  constructor(repository, dbExtraFunction) {
    this.repository = repository;
    this.dbExtraFunction = dbExtraFunction;
  }

  update = async (guid, note, expires_at, userRole, projetId, userId) => {
    try {
      let expiryDate = moment(expires_at).format("YYYY-MM-DD HH:mm:ss");

      const result = await this.dbExtraFunction.runTransaction(async (t) => {
        const apikey = await this.repository.getByGuid(guid);
        if (!apikey) throw new Error("Api Key Not Found");

        let data;
        if (userRole === "admin") {
          data = await this.repository.updateForAdmin(guid, note, expiryDate, projetId, t);
        } else {
          if (userId !== apikey.userId) {
            throw new Error("Access Denied");
          }
          data = await this.repository.updateForUser(guid, note, expiryDate, projetId, userId, t);
        }
        return data;
      });

      return result;
    } catch (error) {
      throw new Error(`Error Updating API Key In Service Layer: ${error.message}`);
    }
  };
}

module.exports = new ApiKeyService(repository, dbExtraFunction);
