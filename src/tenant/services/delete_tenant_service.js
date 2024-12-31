const repository = require("../../models/repository/tenant_repository");
const projectRepository = require("../../models/repository/project_repository");
const deviceRepository = require("../../models/repository/device_repository");

class TenantService {
  constructor(repository, projectRepository, deviceRepository) {
    this.repository = repository;
    this.projectRepository = projectRepository;
    this.deviceRepository = deviceRepository;
  }

  delete = async (deviceUserId, userRole, guid) => {
    try {
      const tenant = await this.repository.getByGuid(guid);
      if (!tenant) return { success: false, message: "Tenant Not Found" };

      let data;
      if (userRole === "admin") {
        data = await this.repository.deleteForAdmin(tenant.guid);
      } else {
        data = await this.repository.deleteForUser(deviceUserId, tenant.guid);
      }

      await projectRepository.deleteByTenantId(tenant.id);
      await deviceRepository.deleteByTenantId(tenant.id);

      return data;
    } catch (error) {
      throw new Error(`Error Delete Tenant: ${error.message}`);
    }
  };
}

module.exports = new TenantService(repository, projectRepository, deviceRepository);
