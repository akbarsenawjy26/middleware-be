const deviceRepository = require("../../models/repository/device_repository");

class DeviceService {
  constructor(deviceRepository) {
    this.deviceRepository = deviceRepository;
  }

  getDeviceByGuid = async (guid, userRole, userId) => {
    try {
      const device = await this.deviceRepository.getDeviceByGuid(guid);
      if (!device) return { success: false, message: "device not found" };

      let data;
      if (userRole === "admin") {
        data = await this.deviceRepository.getDeviceByGuidForAdmin(guid);
      } else {
        data = await this.deviceRepository.getDeviceByGuidForUser(guid, userId);
      }

      return data;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  };

  getDeviceList = async (userRole, deviceUserId) => {
    try {
      let data;
      if (userRole === "admin") {
        data = await this.deviceRepository.getDeviceListForAdmin();
      } else {
        data = await this.deviceRepository.getDeviceListForUser(deviceUserId);
      }

      return data;
    } catch (error) {
      throw new Error(`Error Fetching Device: ${error.message}`);
    }
  };
}

module.exports = new DeviceService(deviceRepository);
