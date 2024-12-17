const repository = require("../../models/repository/tenant_repository");

class TenantService {
  constructor(repository) {
    this.repository = repository;
  }

  delete = async (deviceUserId, userRole, guid) => {
    try {
      const tenant = this.repository.getByGuid(guid);
      if (!tenant) return { success: false, message: "Tenant Not Found" };

      let data;
      if (userRole === "admin") {
        data = await this.repository.deleteForAdmin(guid);
      } else {
        data = await this.repository.deleteForUser(deviceUserId, guid);
      }

      return data;
    } catch (error) {
      throw new Error(`Error Delete Tenant: ${error.message}`);
    }
  };
}

module.exports = new TenantService(repository);
