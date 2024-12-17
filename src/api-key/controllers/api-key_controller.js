const serviceCreate = require("../services/create_api-key_service");
const serviceUpdate = require("../services/update_api-key_service");
const serviceGet = require("../services/read_api-key_service");
const serviceDelete = require("../services/delete_api-key_service");
const responseHelper = require("../../../utils/response_utils");

class ApiKeyController {
  constructor(serviceCreate, serviceDelete, serviceGet, serviceUpdate) {
    this.serviceCreate = serviceCreate;
    this.serviceDelete = serviceDelete;
    this.serviceGet = serviceGet;
    this.serviceUpdate = serviceUpdate;
  }

  getListController = async (req, res) => {
    const { size, page } = req.query;
    try {
      const data = await this.serviceGet.getList(req.userRole, req.deviceUserId, size, page);
      res.status(200).json(responseHelper.success(data, "Success Get All Api Key"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  getByGuidController = async (req, res) => {
    const { guid } = req.params;

    try {
      const data = await this.serviceGet.getByGuid(guid, req.userRole, req.deviceUserId);
      res.status(200).json(responseHelper.success(data, `Success Get Api Key By Guid ${guid}`));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  createController = async (req, res) => {
    const { expires_date, note, projectId } = req.body;
    try {
      const data = await this.serviceCreate.create(req.userId, req.deviceUserId, expires_date, note, projectId);

      res.status(201).json(responseHelper.success(data, "Success Create Api Key"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  updateController = async (req, res) => {
    const { guid } = req.params;
    const { expires_date, note, projectId } = req.body;

    try {
      if (note !== null) {
        const data = await this.serviceUpdate.update(guid, note, expires_date, req.userRole, projectId, req.deviceUserId);
        res.status(200).json(responseHelper.success(data, "Success Update Api Key"));
      }
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  deleteController = async (req, res) => {
    const { guid } = req.params;
    try {
      const data = await this.serviceDelete.delete(guid, req.userRole, req.deviceUserId);

      if (data.message === "Api Key Not Found") {
        return res.status(400).json(responseHelper.fail(null, data.message));
      }
      if (data.message === "Access Denied") {
        return res.status(403).json(responseHelper.fail(null, data.message));
      }

      res.status(200).json(responseHelper.success(null));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };
}

module.exports = new ApiKeyController(serviceCreate, serviceDelete, serviceGet, serviceUpdate);
