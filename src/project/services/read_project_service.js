const repository = require("../../repository/project_repository");

class ProjectService {
  constructor(repository) {
    this.repository = repository;
  }

  getByGuid = async (guid, userRole, userId) => {
    try {
      const project = await this.repository.getByGuid(guid);
      if (!project) return { success: false, message: "Project not Found" };

      let data;
      if (userRole === "admin") {
        data = await this.repository.getByGuidForAdmin(guid);
      } else {
        data = await this.repository.getByGuidForUser(guid, userId);
      }

      return data;
    } catch (error) {
      throw new Error(`Error Get Project by Guid In Service Layer: ${error.message}`);
    }
  };

  getProjectTopic = async (projectId) => {
    const project = await this.repository.getTopicProject(projectId);
    return project;
  };

  getListProjectTopic = async () => {
    const projectList = await this.repository.getListTopicProject();
    return projectList;
  };

  getList = async (userRole, deviceUserId, size, page) => {
    try {
      const limit = size ? parseInt(size) : 10;
      const offset = page ? (parseInt(page) - 1) * limit : 0;

      let data, totalData;
      if (userRole === "admin") {
        totalData = await this.repository.countDataAdmin();

        data = await this.repository.getListForAdmin(limit, offset);
      } else {
        totalData = await this.repository.countDataAdmin();
        data = await this.repository.getListForUser(deviceUserId, limit, offset);
      }

      return {
        totalItems: totalData,
        currentPage: page ? parseInt(page) : 1,
        totalPages: Math.ceil(totalData / limit),
        data,
      };
    } catch (error) {
      throw new Error(`Error Get All Project In Service Layer: ${error.message}`);
    }
  };
}

module.exports = new ProjectService(repository);
