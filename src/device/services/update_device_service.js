const deviceRepository = require("../../models/repository/device_repository");

class DeviceService {
  constructor(deviceRepository) {
    this.deviceRepository = deviceRepository;
  }

  updateDeviceName = async (guid, device_sn, device_name, device_type, device_location, projectId, userRole, userId) => {
    try {
      const device = await this.deviceRepository.getDeviceByGuid(guid);
      if (!device) return { success: false, message: "device not found" };

      let data;
      if (userRole === "admin") {
        data = await this.deviceRepository.updateDeviceForAdmin(guid, device_sn, device_name, device_type, device_location, projectId);
      } else {
        if (userId !== device.userId) {
          return { success: false, message: "access denied" };
        }

        data = await this.deviceRepository.updateDeviceForUser(guid, userId, device_sn, device_name, device_type, device_location, projectId);
      }
      return data;
    } catch (error) {
      throw new Error(`Error Updating Device: ${error.message}`);
    }
  };
}

module.exports = new DeviceService(deviceRepository);
