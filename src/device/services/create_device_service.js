const deviceRepository = require("../../models/repository/device_repository");

class DeviceService {
  constructor(deviceRepository) {
    this.deviceRepository = deviceRepository;
  }
  createDevice = async (device_sn, device_name, device_type, device_location, deviceUserId) => {
    try {
      const data = await this.deviceRepository.createDevice(device_sn, device_name, device_type, device_location, deviceUserId);

      return data;
    } catch (error) {
      throw new Error(`Error in service layer: ${error.message}`);
    }
  };
}

module.exports = new DeviceService(deviceRepository);
