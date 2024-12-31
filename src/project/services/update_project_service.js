const repository = require("../../models/repository/project_repository");

class ProjectService {
  constructor(repository) {
    this.repository = repository;
  }

  update = async (guid, vendor, version, project_name, identity, tenantId, userRole, userId, topic) => {
    try {
      const project = await this.repository.getByGuid(guid);
      if (!project) return { success: false, message: "Project Not Found" };

      let data;
      if (userRole === "admin") {
        data = await this.repository.updateForAdmin(guid, vendor, version, project_name, identity, tenantId, topic);
      } else {
        if (userId !== project.userId) {
          return { success: false, message: "Access Denied" };
        }

        data = await this.repository.updateForUser(guid, userId, vendor, version, project_name, identity, tenantId, topic);
      }
      return data;
    } catch (error) {
      throw new Error(`Error Update Project In Service Layer: ${error.message}`);
    }
  };
}

module.exports = new ProjectService(repository);
