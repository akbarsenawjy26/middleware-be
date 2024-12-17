const repository = require("../../models/repository/project_repository");

class ProjectService {
  constructor(repository) {
    this.repository = repository;
  }

  delete = async (guid, userRole, deviceUserId) => {
    try {
      const project = await this.repository.getByGuid(guid);
      if (!project) return { success: false, message: "Project Not Found" };

      let data;
      if (userRole === "admin") {
        data = await this.repository.deleteForAdmin(guid);
      } else {
        if (deviceUserId !== project.userId) {
          return { success: false, message: "Access Denied" };
        }
        data = await this.repository.deleteForUser(guid, deviceUserId);
      }

      return data;
    } catch (error) {
      throw new Error(`Error Delete Project In Service Layer: ${error.message}`);
    }
  };
}

module.exports = new ProjectService(repository);
