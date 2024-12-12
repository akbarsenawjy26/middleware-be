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

  getDeviceList = async (userRole, deviceUserId, size, page) => {
    try {
      const limit = size ? parseInt(size) : 10;
      const offset = page ? (parseInt(page) - 1) * limit : 0;

      let data, totalData;
      if (userRole === "admin") {
        totalData = await this.deviceRepository.countDataAdmin();
        data = await this.deviceRepository.getDeviceListForAdmin(limit, offset);
      } else {
        totalData = await this.deviceRepository.countDataAdmin();
        data = await this.deviceRepository.getDeviceListForUser(deviceUserId, limit, offset);
      }

      return {
        totalItems: totalData,
        currentPage: page ? parseInt(page) : 1,
        totalPages: Math.ceil(totalData / limit),
        data,
      };
    } catch (error) {
      throw new Error(`Error Fetching Device: ${error.message}`);
    }
  };
}

module.exports = new DeviceService(deviceRepository);
