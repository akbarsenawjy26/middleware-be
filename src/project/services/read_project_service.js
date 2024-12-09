const projectRepository = require("../../models/repository/project_repository");

class ProjectService {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  getProjectList = async (userRole) => {
    try {
      let data;
      if (userRole === "admin") {
        data = await this.projectRepository.getProjectListForAdmin();
      } else {
        data = await this.projectRepository.getProjectListForUser(deviceUserId);
      }

      return data;
    } catch (error) {
      throw new Error(`Error Fetching Project: ${error.message}`);
    }
  };

  getProjectByGuid = async (guid, userRole, userId) => {
    try {
      const project = await this.projectRepository.getProjectByGuid(guid);
      if (!project) return { success: false, message: "project not found" };

      let data;
      if (userRole === "admin") {
        data = await this.projectRepository.getProjectByGuidForAdmin(guid);
      } else {
        data = await this.projectRepository.getProjectByGuidForUser(guid, userId);
      }

      return data;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  };

  getProjectTopic = async () => {};
}

module.exports = new ProjectService(projectRepository);
