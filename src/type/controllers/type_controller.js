const responseHelper = require("../../../utils/response_utils");
const createService = require("../services/create_type_service");
const readService = require("../services/read_type_service");
const updateService = require("../services/update_type_service");
const deleteService = require("../services/delete_type_service");

class TypeController {
  constructor(createService, readService, updateService, deleteService) {
    this.createService = createService;
    this.readService = readService;
    this.updateService = updateService;
    this.deleteService = deleteService;
  }

  createController = async (req, res) => {
    const { name_type } = req.body;
    try {
      const data = await this.createService.create(req.deviceUserId, name_type);
      res.status(201).json(responseHelper.success(data, "Success Create New Type"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  getListController = async (req, res) => {
    const { size, page } = req.query;

    try {
      const data = await this.readService.getList(req.userRole, req.deviceUserId, size, page);
      res.status(200).json(responseHelper.success(data, "Success Get All Type"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  getByGuidController = async (req, res) => {
    const { guid } = req.params;

    try {
      const data = await this.readService.getByGuid(guid, req.userRole, req.deviceUserId);
      res.status(200).json(responseHelper.success(data, `Success Get Type by Guid`));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  updateController = async (req, res) => {
    const { guid } = req.params;
    const { name_type } = req.body;

    try {
      const data = await this.updateService.update(req.deviceUserId, req.userRole, guid, name_type);
      res.status(200).json(responseHelper.success(data, "Success Update Type"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  deleteController = async (req, res) => {
    const { guid } = req.params;

    try {
      const data = await this.deleteService.delete(req.deviceUserId, req.userRole, guid);
      res.status(200).json(responseHelper.success(data, "Success Delete Type"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };
}

module.exports = new TypeController(createService, readService, updateService, deleteService);
