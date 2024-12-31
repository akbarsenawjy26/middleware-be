const repository = require("../../models/repository/device_repository");

class DeviceService {
  constructor(repository) {
    this.repository = repository;
  }

  getByGuid = async (guid, userRole, userId) => {
    try {
      const device = await this.repository.getByGuid(guid);
      if (!device) return { success: false, message: "Device Not Found" };

      let data;
      if (userRole === "admin") {
        data = await this.repository.getByGuidForAdmin(guid);
      } else {
        data = await this.repository.getByGuidForUser(guid, userId);
      }

      return data;
    } catch (error) {
      throw new Error(`Error Get Device by Guid In Service Layer: ${error.message}`);
    }
  };

  getByProjectId = async (projectId) => {
    try {
      const data = await this.repository.getByProjectId(projectId);
      if (!data) return { success: false, message: "Device Not Found" };

      return data;
    } catch (error) {
      throw new Error(`Error Get Device by Guid In Service Layer: ${error.message}`);
    }
  };

  getList = async (userRole, deviceUserId, size, page) => {
    try {
      const limit = size ? parseInt(size) : 10;
      const offset = page ? (parseInt(page) - 1) * limit : 0;

      let data, totalData;
      if (userRole === "admin") {
        totalData = await this.repository.countDataAdmin();
        data = await this.repository.getListForAdmin(limit, offset);
      } else {
        totalData = await this.repository.countDataAdmin();
        data = await this.repository.getListForUser(deviceUserId, limit, offset);
      }

      return {
        totalItems: totalData,
        currentPage: page ? parseInt(page) : 1,
        totalPages: Math.ceil(totalData / limit),
        data,
      };
    } catch (error) {
      throw new Error(`Error Get All Device In Service Layer: ${error.message}`);
    }
  };
}

module.exports = new DeviceService(repository);
