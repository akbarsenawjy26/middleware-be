const deviceRepository = require("../../models/repository/device_repository");

class DeviceService {
  constructor(deviceRepository) {
    this.deviceRepository = deviceRepository;
  }
  deleteDevice = async (guid, userRole, deviceUserId) => {
    try {
      const device = await this.deviceRepository.getDeviceByGuid(guid);
      if (!device) return { success: false, message: "Device not found" };

      let data;
      if (userRole === "admin") {
        data = await this.deviceRepository.deleteDeviceForAdmin(guid);
      } else {
        if (deviceUserId !== device.userId) {
          return { success: false, message: "access denied" };
        }
        data = await this.deviceRepository.deleteDeviceForUser(guid, deviceUserId);
      }

      return data;
    } catch (error) {
      throw new Error(`Error delete Device: ${error.message}`);
    }
  };
}

module.exports = new DeviceService(deviceRepository);
