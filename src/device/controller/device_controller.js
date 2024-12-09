const responseHelper = require("../../../utils/response_utils");
const serviceGetDevice = require("../services/read_device_service");
const serviceCreateDevice = require("../services/create_device_service");
const serviceDeleteDevice = require("../services/delete_device_service");
const serviceUpdateDevice = require("../services/update_device_service");

class DeviceController {
  createDevice = async (req, res) => {
    const { device_sn, device_name, device_type, device_location, projectId } = req.body;
    try {
      const data = await serviceCreateDevice.createDevice(device_sn, device_name, device_type, device_location, projectId, req.deviceUserId);
      res.status(201).json(responseHelper.success(data, "Success create new device"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  getDeviceList = async (req, res) => {
    try {
      const data = await serviceGetDevice.getDeviceList(req.userRole, req.deviceUserId);
      res.status(200).json(responseHelper.success(data, "Success get All data"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  getDeviceByGuid = async (req, res) => {
    const { guid } = req.params;

    try {
      const data = await serviceGetDevice.getDeviceByGuid(guid, req.userRole, req.deviceUserId);

      res.status(200).json(responseHelper.success(data, "Success get All data"));
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  updateDevice = async (req, res) => {
    const { guid } = req.params;
    const { device_sn, device_name, device_type, device_location, projectId } = req.body;

    try {
      if (device_name !== null) {
        const data = await serviceUpdateDevice.updateDeviceName(guid, device_sn, device_name, device_type, device_location, projectId, req.userRole, req.deviceUserId);
        res.status(200).json(responseHelper.success(data, "success update data"));
      }
    } catch (error) {
      res.status(500).json(responseHelper.error(error.message));
    }
  };

  deleteDevice = async (req, res) => {
    const { guid } = req.params;
    try {
      const data = await serviceDeleteDevice.deleteDevice(guid, req.userRole, req.deviceUserId);
      if (data.message === "device not found") {
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
}

module.exports = new DeviceController();
