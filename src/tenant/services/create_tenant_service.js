const repository = require("../../models/repository/tenant_repository");

class TenantService {
  constructor(repository) {
    this.repository = repository;
  }

  create = async (deviceUserId, name_tenant, alias) => {
    try {
      const data = await this.repository.create(deviceUserId, name_tenant, alias);

      return data;
    } catch (error) {
      throw new Error(`Error in service layer: ${error.message}`);
    }
  };
}

module.exports = new TenantService(repository);
