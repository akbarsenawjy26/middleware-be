const projectRepository = require("../../models/repository/project_repository");

class ProjectService {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  deleteProject = async (guid, userRole, deviceUserId) => {
    try {
      const project = await this.projectRepository.getProjectByGuid(guid);
      if (!project) return { success: false, message: "Device not found" };

      let data;
      if (userRole === "admin") {
        data = await this.projectRepository.deleteProjectForAdmin(guid);
      } else {
        if (deviceUserId !== device.userId) {
          return { success: false, message: "access denied" };
        }
        data = await this.projectRepository.deleteProjectForUser(guid, deviceUserId);
      }

      return data;
    } catch (error) {
      throw new Error(`Error delete Device: ${error.message}`);
    }
  };
}

module.exports = new ProjectService(projectRepository);
