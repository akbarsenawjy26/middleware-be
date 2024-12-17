const repository = require("../../models/repository/tenant_repository");

class TenantService {
  constructor(repository) {
    this.repository = repository;
  }

  update = async (userId, userRole, guid, name_tenant) => {
    try {
      const tenant = await this.repository.getByGuid(guid);
      if (!tenant) return { success: false, message: "Tenant Not Found" };

      let data;
      if (userRole === "admin") {
        data = await this.repository.updateForAdmin(guid, name_tenant);
      } else {
        data = await this.repository.updateForUser(userId, guid, name_tenant);
      }

      return data;
    } catch (error) {
      throw new Error(`Error Updating Tenant: ${error.message}`);
    }
  };
}

module.exports = new TenantService(repository);
