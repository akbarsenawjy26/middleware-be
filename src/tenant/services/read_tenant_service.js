// const repository = require("../../models/repository/tenant_repository");
const repository = require("../../repository/tenant_repository");

class TenantService {
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
      throw new Error(`Error Fetching Tenants: ${error.message}`);
    }
  };

  getByGuid = async (guid, userRole, userId) => {
    try {
      const tenant = await this.repository.getByGuid(guid);
      if (!tenant) return { success: false, message: "Tenant not Found" };

      let data;
      if (userRole === "admin") {
        data = await this.repository.getByGuidForAdmin(guid);
      } else {
        data = await this.repository.getByGuidForUser(guid, userId);
      }

      return data;
    } catch (error) {
      throw new Error(`Error fetching Tenant: ${error.message}`);
    }
  };
}

module.exports = new TenantService(repository);
