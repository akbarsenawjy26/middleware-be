const responseHelper = require("../../../utils/response_utils");
const createService = require("../services/create_tenant_service");
const readService = require("../services/read_tenant_service");
const updateService = require("../services/update_tenant_service");
const deleteService = require("../services/delete_tenant_service");

class TenantController {
  constructor(createService, readService, updateService, deleteService) {
    this.createService = createService;
    this.readService = readService;
    this.updateService = updateService;
    this.deleteService = deleteService;
  }

  createController = async (req, res) => {
    const { name_tenant } = req.body;
    try {
      const data = await this.createService.create(req.deviceUserId, name_tenant);
      res.status(201).json(responseHelper.success(data, "Success Create New Tenant"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  getListController = async (req, res) => {
    const { size, page } = req.query;

    try {
      const data = await this.readService.getList(req.userRole, req.deviceUserId, size, page);
      res.status(200).json(responseHelper.success(data, "Success Get All Tenants"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  getByGuidController = async (req, res) => {
    const { guid } = req.params;

    try {
      const data = await this.readService.getByGuid(guid, req.userRole, req.deviceUserId);
      res.status(200).json(responseHelper.success(data, `Success Get Tenant by Guid`));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  updateController = async (req, res) => {
    const { guid } = req.params;
    const { name_tenant } = req.body;

    try {
      const data = await this.updateService.update(req.deviceUserId, req.userRole, guid, name_tenant);
      res.status(200).json(responseHelper.success(data, "Success Update Tenant"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  deleteController = async (req, res) => {
    const { guid } = req.params;

    try {
      const data = await this.deleteService.delete(req.deviceUserId, req.userRole, guid);
      res.status(200).json(responseHelper.success(data, "Success Delete Tenant"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };
}

module.exports = new TenantController(createService, readService, updateService, deleteService);
