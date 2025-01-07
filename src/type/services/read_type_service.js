// const repository = require("../../models/repository/type_repository");
const repository = require("../../repository/type_repository");

class TypeService {
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
        totalData = await this.repository.countDataUser();
        data = await this.repository.getListForAdmin(deviceUserId, limit, offset);
      }

      return {
        totalItems: totalData,
        currentPage: page ? parseInt(page) : 1,
        totalPages: Math.ceil(totalData / limit),
        data,
      };
    } catch (error) {
      throw new Error(`Error Fetching Types: ${error.message}`);
    }
  };

  getByGuid = async (guid, userRole, userId) => {
    try {
      const tenant = await this.repository.getByGuid(guid);
      if (!tenant) return { success: false, message: "Tenant Not Found" };

      let data;
      if (userRole === "admin") {
        data = await this.repository.getByGuidForAdmin(guid);
      } else {
        data = await this.repository.getByGuidForUser(guid, userId);
      }

      return data;
    } catch (error) {
      throw new Error(`Error Fetching Tenant: ${error.message}`);
    }
  };

  getById = async (id) => {
    try {
      const data = await this.repository.getById(id);

      return data;
    } catch (error) {
      throw new Error(`Error Fetching Tenant: ${error.message}`);
    }
  };
}

module.exports = new TypeService(repository);
