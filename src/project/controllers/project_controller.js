const responseHelper = require("../../../utils/response_utils");
const serviceCreateProject = require("../services/create_project_service");
const serviceGetProject = require("../services/read_project_service");
const serviceDeleteProject = require("../services/delete_project_service");
const serviceUpdateProject = require("../services/update_project_service");

class ProjectController {
  createProject = async (req, res) => {
    const { vendor, version, project_name, identity } = req.body;

    try {
      const data = await serviceCreateProject.createProject(vendor, version, project_name, identity, req.deviceUserId);
      res.status(201).json(responseHelper.success(data, "Success create new device"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  getProjectList = async (req, res) => {
    try {
      const data = await serviceGetProject.getProjectList(req.userRole, req.deviceUserId);
      res.status(200).json(responseHelper.success(data, "Success get All data"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  getProjectByGuid = async (req, res) => {
    const { guid } = req.params;

    try {
      const data = await serviceGetProject.getProjectByGuid(guid, req.userRole, req.deviceUserId);

      res.status(200).json(responseHelper.success(data, "Success get Project data"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  updateProject = async (req, res) => {
    const { guid } = req.params;
    const { vendor, version, project_name, identity } = req.body;

    try {
      const data = await serviceUpdateProject.updateProject(guid, vendor, version, project_name, identity, req.userRole, req.deviceUserId);
      res.status(200).json(responseHelper.success(data, "success update data"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  deleteProject = async (req, res) => {
    const { guid } = req.params;
    try {
      const data = await serviceDeleteProject.deleteProject(guid, req.userRole, req.deviceUserId);
      if (data.message === "project not found") {
        return res.status(400).json(responseHelper.fail(null, data.message));
      }
      if (data.message === "access denied") {
        return res.status(403).json(responseHelper.fail(null, data.message));
      }

      res.status(200).json(responseHelper.success(null));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  getTopic = async (req, res) => {
    try {
      const data = await serviceGetProject.getProjectTopic(req.projectId);
      res.status(200).json(responseHelper.success(data));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };
}

module.exports = new ProjectController();
