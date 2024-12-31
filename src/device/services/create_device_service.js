const repository = require("../../models/repository/device_repository");

class DeviceService {
  constructor(repository) {
    this.repository = repository;
  }
  create = async (device_sn, device_name, device_location, projectId, deviceUserId, tenantId, typeId, group) => {
    try {
      const data = await this.repository.create(device_sn, device_name, device_location, projectId, deviceUserId, tenantId, typeId, group);

      return data;
    } catch (error) {
      throw new Error(`Error Creating Device In service Layer: ${error.message}`);
    }
  };
}

module.exports = new DeviceService(repository);
