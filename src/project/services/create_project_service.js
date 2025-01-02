// const repository = require("../../models/repository/project_repository");
const repository = require("../../repository/project_repository");

class ProjectService {
  constructor(repository) {
    this.repository = repository;
  }

  create = async (deviceUserId, vendor, version, project_name, identity, tenantId) => {
    try {
      const data = await this.repository.create(deviceUserId, vendor, version, project_name, identity, tenantId);

      return data;
    } catch (error) {
      throw new Error(`Error Create Project In Service Layer: ${error.message}`);
    }
  };
}

module.exports = new ProjectService(repository);
