const deviceModel = require("../device_models");
const userModel = require("../user_models");

class DeviceRepository {
  constructor(deviceModel) {
    this.deviceModel = deviceModel;
  }

  createDevice = async (device_sn, device_name, device_type, device_location, project, deviceUserId) => {
    return await deviceModel.create({
      device_sn: device_sn,
      device_name: device_name,
      device_type: device_type,
      device_location: device_location,
      project: project,
      userId: deviceUserId,
    });
  };

  getDeviceByGuid = async (guid) => {
    return await deviceModel.findOne({ where: { guid } });
  };

  getDeviceByGuidForAdmin = async (guid) => {
    return await deviceModel.findOne({
      where: { guid: guid },
      attributes: ["guid", "device_sn", "device_name", "device_type", "device_location", "project"],
      include: [
        {
          model: userModel,
          attributes: ["name", "email"],
        },
      ],
    });
  };

  getDeviceByGuidForUser = async (guid, userId) => {
    return await deviceModel.findAll({
      attributes: ["guid", "device_sn", "device_name", "device_type", "device_location", "project"],
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

  getDeviceListForAdmin = async () => {
    return await deviceModel.findAll({
      attributes: ["guid", "device_sn", "device_name", "device_type", "device_location", "project"],
      include: [
        {
          model: userModel,
          attributes: ["name", "email"],
        },
      ],
    });
  };

  getDeviceListForUser = async (deviceUserId) => {
    return await deviceModel.findAll({
      attributes: ["guid", "device_sn", "device_name", "device_type", "device_location", "project"],
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

  deleteDeviceForAdmin = async (guid) => {
    return await deviceModel.destroy({ where: { guid } });
  };

  deleteDeviceForUser = async (guid, deviceUserId) => {
    return await deviceModel.destroy({ where: { [Op.and]: [{ guid: guid }, { userId: deviceUserId }] } });
  };

  updateDeviceForAdmin = async (guid, device_sn, device_name, device_type, device_location, project) => {
    return await deviceModel.update(
      {
        device_sn: device_sn,
        device_name: device_name,
        device_type: device_type,
        device_location: device_location,
        project: project,
      },
      { where: { guid } }
    );
  };

  updateDeviceForUser = async (guid, userId, device_sn, device_name, device_type, device_location, project) => {
    return await device.update(
      {
        device_sn: device_sn,
        device_name: device_name,
        device_type: device_type,
        device_location: device_location,
        project: project,
      },
      { where: { [Op.and]: [{ guid: guid }, { userId: userId }] } }
    );
  };
}

module.exports = new DeviceRepository(deviceModel);
