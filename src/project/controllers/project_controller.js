const responseHelper = require("../../../utils/response_utils");
const serviceCreate = require("../services/create_project_service");
const serviceGet = require("../services/read_project_service");
const serviceDelete = require("../services/delete_project_service");
const serviceUpdate = require("../services/update_project_service");

class ProjectController {
  constructor(serviceCreate, serviceGet, serviceDelete, serviceUpdate) {
    this.serviceCreate = serviceCreate;
    this.serviceGet = serviceGet;
    this.serviceDelete = serviceDelete;
    this.serviceUpdate = serviceUpdate;
  }

  createController = async (req, res) => {
    const { vendor, version, project_name, identity, tenantId } = req.body;

    try {
      const data = await this.serviceCreate.create(req.deviceUserId, vendor, version, project_name, identity, tenantId);
      res.status(201).json(responseHelper.success(data, "Success Create New Project"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  getListController = async (req, res) => {
    const { size, page } = req.query;
    try {
      const data = await this.serviceGet.getList(req.userRole, req.deviceUserId, size, page);
      res.status(200).json(responseHelper.success(data, "Success get All data"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  getByGuidController = async (req, res) => {
    const { guid } = req.params;

    try {
      const data = await this.serviceGet.getByGuid(guid, req.userRole, req.deviceUserId);

      res.status(200).json(responseHelper.success(data, "Success get Project data"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  updateController = async (req, res) => {
    const { guid } = req.params;
    const { vendor, version, project_name, identity, tenantId } = req.body;

    try {
      const data = await this.serviceUpdate.update(guid, vendor, version, project_name, identity, tenantId, req.userRole, req.deviceUserId);
      res.status(200).json(responseHelper.success(data, "success update data"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  deleteController = async (req, res) => {
    const { guid } = req.params;
    try {
      const data = await this.serviceDelete.delete(guid, req.userRole, req.deviceUserId);
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

  getTopicController = async (req, res) => {
    try {
      console.log("ProjectId:", req.projectId);
      const data = await this.serviceGet.getProjectTopic(req.projectId);
      res.status(200).json(responseHelper.success(data));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };
}

module.exports = new ProjectController(serviceCreate, serviceGet, serviceDelete, serviceUpdate);
