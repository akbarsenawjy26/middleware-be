const responseHelper = require("../../../utils/response_utils");
const serviceGet = require("../services/read_device_service");
const serviceCreate = require("../services/create_device_service");
const serviceDelete = require("../services/delete_device_service");
const serviceUpdate = require("../services/update_device_service");

class DeviceController {
  constructor(serviceCreate, serviceGet, serviceUpdate, serviceDelete) {
    this.serviceCreate = serviceCreate;
    this.serviceGet = serviceGet;
    this.serviceUpdate = serviceUpdate;
    this.serviceDelete = serviceDelete;
  }
  createController = async (req, res) => {
    const { device_sn, device_name, device_location, projectId, tenantId, typeId, group } = req.body;
    try {
      const data = await this.serviceCreate.create(device_sn, device_name, device_location, projectId, req.deviceUserId, tenantId, typeId, group);
      res.status(201).json(responseHelper.success(data, "Success Create new Device"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  getListController = async (req, res) => {
    const { size, page } = req.query;

    try {
      const data = await this.serviceGet.getList(req.userRole, req.deviceUserId, size, page);
      res.status(200).json(responseHelper.success(data, "Success Get All Device"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  getByGuidController = async (req, res) => {
    const { guid } = req.params;

    try {
      const data = await this.serviceGet.getByGuid(guid, req.userRole, req.deviceUserId);

      res.status(200).json(responseHelper.success(data, `Success Get Device by Guid: ${guid}`));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  getByProjectIdController = async (req, res) => {
    const { projectId } = req.params;
    try {
      const data = await this.serviceGet.getByProjectId(projectId);

      res.status(200).json(responseHelper.success(data, `Success Get Device by ProjectId: ${projectId}`));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  updateController = async (req, res) => {
    const { guid } = req.params;
    const { device_sn, device_name, device_location, projectId, tenantId, typeId, group } = req.body;

    try {
      if (device_name !== null) {
        const data = await this.serviceUpdate.update(guid, device_sn, device_name, device_location, projectId, req.userRole, req.deviceUserId, tenantId, typeId, group);
        res.status(200).json(responseHelper.success(data, "Success Update Data"));
      }
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  deleteController = async (req, res) => {
    const { guid } = req.params;
    try {
      const data = await this.serviceDelete.delete(guid, req.userRole, req.deviceUserId);
      if (data.message === "Device Not Found") {
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

module.exports = new DeviceController(serviceCreate, serviceGet, serviceUpdate, serviceDelete);
