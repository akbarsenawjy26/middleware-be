const deviceModel = require("../device_models");
const userModel = require("../user_models");
const projectModel = require("../project_models");

class DeviceRepository {
  constructor(deviceModel) {
    this.deviceModel = deviceModel;
  }

  createDevice = async (device_sn, device_name, device_type, device_location, projectId, deviceUserId) => {
    return await deviceModel.create({
      device_sn: device_sn,
      device_name: device_name,
      device_type: device_type,
      device_location: device_location,
      projectId: projectId,
      userId: deviceUserId,
    });
  };

  getDeviceByGuid = async (guid) => {
    return await deviceModel.findOne({ where: { guid } });
  };

  getDeviceByGuidForAdmin = async (guid) => {
    return await deviceModel.findOne({
      where: { guid: guid },
      attributes: ["guid", "device_sn", "device_name", "device_type", "device_location", "projectId"],
      include: [
        {
          model: userModel,
          attributes: ["name", "email"],
        },
        {
          model: projectModel,
          attributes: ["project_name"],
        },
      ],
    });
  };

  getDeviceByGuidForUser = async (guid, userId) => {
    return await deviceModel.findAll({
      attributes: ["guid", "device_sn", "device_name", "device_type", "device_location", "projectId"],
      where: {
        [Op.and]: [{ guid: guid }, { userId: userId }],
      },
      include: [
        {
          model: userModel,
          attributes: ["name", "email"],
        },
        {
          model: projectModel,
          attributes: ["project_name"],
        },
      ],
    });
  };

  getDeviceListForAdmin = async (limit, offset) => {
    return await deviceModel.findAll({
      limit,
      offset,
      attributes: ["guid", "device_sn", "device_name", "device_type", "device_location", "projectId"],
      include: [
        {
          model: userModel,
          attributes: ["name", "email"],
        },
        {
          model: projectModel,
          attributes: ["project_name"],
        },
      ],
    });
  };

  getDeviceListForUser = async (deviceUserId, limit, offset) => {
    return await deviceModel.findAll({
      limit,
      offset,
      attributes: ["guid", "device_sn", "device_name", "device_type", "device_location", "projectId"],
      where: {
        userId: deviceUserId,
      },
      include: [
        {
          model: userModel,
          attributes: ["name", "email"],
        },
        {
          model: projectModel,
          attributes: ["project_name"],
        },
      ],
    });
  };

  deleteDeviceForAdmin = async (guid) => {
    return await deviceModel.destroy({ where: { guid } });
  };

  deleteDeviceForUser = async (guid, deviceUserId) => {
    return await deviceModel.destroy({ where: { [Op.and]: [{ guid: guid }, { userId: deviceUserId }] } });
  };

  updateDeviceForAdmin = async (guid, device_sn, device_name, device_type, device_location, projectId) => {
    return await deviceModel.update(
      {
        device_sn: device_sn,
        device_name: device_name,
        device_type: device_type,
        device_location: device_location,
        projectId: projectId,
      },
      { where: { guid } }
    );
  };

  updateDeviceForUser = async (guid, userId, device_sn, device_name, device_type, device_location, projectId) => {
    return await device.update(
      {
        device_sn: device_sn,
        device_name: device_name,
        device_type: device_type,
        device_location: device_location,
        projectId: projectId,
      },
      { where: { [Op.and]: [{ guid: guid }, { userId: userId }] } }
    );
  };

  countDataAdmin = async () => {
    return await deviceModel.count();
  };

  countDataUser = async (deviceUserId) => {
    return await deviceModel.count({
      where: { deviceUserId },
    });
  };
}

module.exports = new DeviceRepository(deviceModel);
