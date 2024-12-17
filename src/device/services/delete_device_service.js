const repository = require("../../models/repository/device_repository");

class DeviceService {
  constructor(repository) {
    this.repository = repository;
  }
  delete = async (guid, userRole, deviceUserId) => {
    try {
      const device = await this.repository.getByGuid(guid);
      if (!device) return { success: false, message: "Device Not Found" };

      let data;
      if (userRole === "admin") {
        data = await this.repository.deleteForAdmin(guid);
      } else {
        if (deviceUserId !== device.userId) {
          return { success: false, message: "Access Denied" };
        }
        data = await this.repository.deleteForUser(guid, deviceUserId);
      }

      return data;
    } catch (error) {
      throw new Error(`Error Deleting Device In Service Layer: ${error.message}`);
    }
  };
}

module.exports = new DeviceService(repository);
