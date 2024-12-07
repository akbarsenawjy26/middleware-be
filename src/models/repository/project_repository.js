const projectModels = require("../../models/project_models");
const userModel = require("../../models/user_models");

class ProjectRepository {
  constructor(projectModels) {
    this.projectModels = projectModels;
  }

  createProject = async (vendor, version, project_name, identity, deviceUserId) => {
    return await projectModels.create({
      vendor: vendor,
      version: version,
      project_name: project_name,
      identity: identity,
      userId: deviceUserId,
    });
  };

  getProjectListForAdmin = async () => {
    return await projectModels.findAll({
      attributes: ["guid", "vendor", "version", "project_name", "identity", "topic"],
      include: [
        {
          model: userModel,
          attributes: ["name", "email"],
        },
      ],
    });
  };
  getProjectListForUser = async (deviceUserId) => {
    return await projectModels.findAll({
      attributes: ["guid", "vendor", "version", "project_name", "identity", "topic"],
      where: {
        userId: deviceUserId,
      },
      include: [
        {
          model: userModel,
          attributes: ["name", "email"],
        },
      ],
    });
  };

  getProjectByGuid = async (guid) => {
    return await projectModels.findOne({ where: { guid } });
  };

  getProjectByGuidForAdmin = async (guid) => {
    return await projectModels.findOne({
      where: { guid: guid },
      attributes: ["guid", "vendor", "version", "project_name", "identity"],
      include: [
        {
          model: userModel,
          attributes: ["name", "email"],
        },
      ],
    });
  };

  getProjectByGuidForUser = async (guid, userId) => {
    return await projectModels.findAll({
      attributes: ["guid", "vendor", "version", "project_name", "identity"],
      where: {
        [Op.and]: [{ guid: guid }, { userId: userId }],
      },
      include: [
        {
          model: userModel,
          attributes: ["name", "email"],
        },
      ],
    });
  };

  deleteProjectForAdmin = async (guid) => {
    return await projectModels.destroy({ where: { guid } });
  };

  deleteProjectForUser = async (guid, deviceUserId) => {
    return await projectModels.destroy({ where: { [Op.and]: [{ guid: guid }, { userId: deviceUserId }] } });
  };

  updateProjectForAdmin = async (guid, vendor, version, project_name, identity) => {
    return await projectModels.update(
      {
        vendor: vendor,
        version: version,
        project_name: project_name,
        identity: identity,
      },
      { where: { guid } }
    );
  };

  updateProjectForUser = async (guid, userId, vendor, version, project_name, identity) => {
    return await projectModels.update(
      {
        vendor: vendor,
        version: version,
        project_name: project_name,
        identity: identity,
      },
      { where: { [Op.and]: [{ guid: guid }, { userId: userId }] } }
    );
  };
}

module.exports = new ProjectRepository(projectModels);
