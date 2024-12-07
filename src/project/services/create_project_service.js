const projectRepository = require("../../models/repository/project_repository");

class ProjectService {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  createProject = async (vendor, version, project_name, identity, deviceUserId) => {
    try {
      const data = await this.projectRepository.createProject(vendor, version, project_name, identity, deviceUserId);

      return data;
    } catch (error) {
      throw new Error(`Error in service layer: ${error.message}`);
    }
  };
}

module.exports = new ProjectService(projectRepository);
