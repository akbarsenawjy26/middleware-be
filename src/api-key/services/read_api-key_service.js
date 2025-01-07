// const repository = require("../../models/repository/api-key_repository");
const repository = require("../../repository/api-key_repository");

class ApiKeyService {
  constructor(repository) {
    this.repository = repository;
  }

  getList = async (userRole, deviceUserId, size, page) => {
    try {
      const limit = size ? parseInt(size) : 10;
      const offset = page ? (parseInt(page) - 1) * limit : 0;

      let data, totalData;

      if (userRole === "admin") {
        totalData = await this.repository.countDataAdmin();
        data = await this.repository.getListForAdmin(limit, offset);
      } else {
        totalData = await this.repository.countDataUser(deviceUserId);
        data = await this.repository.getListForUser(deviceUserId, limit, offset);
      }

      return {
        totalItems: totalData,
        currentPage: page ? parseInt(page) : 1,
        totalPages: Math.ceil(totalData / limit),
        data,
      };
    } catch (error) {
      throw new Error(`Error Get API Key In Service Layer: ${error.message}`);
    }
  };

  getByGuid = async (guid, userRole, userId) => {
    try {
      const apiKey = await this.repository.getByGuid(guid);
      if (!apiKey) return { success: false, message: "api key not found" };

      let data;
      if (userRole === "admin") {
        data = await this.repository.getByGuidForAdmin(guid);
      } else {
        data = await this.repository.getByGuidForUser(guid, userId);
      }

      return data;
    } catch (error) {
      throw new Error(`Error Get Api Key By guid In Service Layer: ${error.message}`);
    }
  };

  getById = async (id) => {
    try {
      const data = await this.repository.getById(id);

      return data;
    } catch (error) {
      throw new Error(`Error Get Api Key By id In Service Layer: ${error.message}`);
    }
  };
}

module.exports = new ApiKeyService(repository);
