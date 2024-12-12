const projectRepository = require("../../models/repository/project_repository");

class ProjectService {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

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

  getProjectTopic = async (projectId) => {
    const project = await this.projectRepository.getTopicProject(projectId);
    return project;
  };

  getProjectList = async (userRole, deviceUserId, size, page) => {
    try {
      const limit = size ? parseInt(size) : 10;
      const offset = page ? (parseInt(page) - 1) * limit : 0;

      let data, totalData;
      if (userRole === "admin") {
        totalData = await this.projectRepository.countDataAdmin();

        data = await this.projectRepository.getProjectListForAdmin(limit, offset);
      } else {
        totalData = await this.projectRepository.countDataAdmin();
        data = await this.projectRepository.getProjectListForUser(deviceUserId, limit, offset);
      }

      return {
        totalItems: totalData,
        currentPage: page ? parseInt(page) : 1,
        totalPages: Math.ceil(totalData / limit),
        data,
      };
    } catch (error) {
      throw new Error(`Error Fetching Project: ${error.message}`);
    }
  };
}

module.exports = new ProjectService(projectRepository);
