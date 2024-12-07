const projectRepository = require("../../models/repository/project_repository");

class ProjectService {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  updateProject = async (guid, vendor, version, project_name, identity, userRole, userId) => {
    try {
      const project = await this.projectRepository.getProjectByGuid(guid);
      if (!project) return { success: false, message: "project not found" };

      let data;
      if (userRole === "admin") {
        data = await this.projectRepository.updateProjectForAdmin(guid, vendor, version, project_name, identity);
      } else {
        if (userId !== device.userId) {
          return { success: false, message: "access denied" };
        }

        data = await this.projectRepository.updateProjectForUser(guid, userId, vendor, version, project_name, identity);
      }
      return data;
    } catch (error) {
      throw new Error(`Error Updating Project: ${error.message}`);
    }
  };
}

module.exports = new ProjectService(projectRepository);
