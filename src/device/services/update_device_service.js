const repository = require("../../models/repository/device_repository");

class DeviceService {
  constructor(repository) {
    this.repository = repository;
  }

  update = async (guid, device_sn, device_name, device_location, projectId, userRole, userId, tenantId, typeId, group) => {
    try {
      const device = await this.repository.getByGuid(guid);
      if (!device) return { success: false, message: "Device Not Found" };

      let data;
      if (userRole === "admin") {
        data = await this.repository.updateForAdmin(guid, device_sn, device_name, device_location, projectId, tenantId, typeId, group);
      } else {
        if (userId !== device.userId) {
          return { success: false, message: "Access Denied" };
        }

        data = await this.repository.updateForUser(guid, userId, device_sn, device_name, device_location, projectId, tenantId, typeId, group);
      }
      return data;
    } catch (error) {
      throw new Error(`Error Updating Device In Service Layer: ${error.message}`);
    }
  };
}

module.exports = new DeviceService(repository);
