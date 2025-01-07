// const repository = require("../../models/repository/type_repository");
// const deviceRepository = require("../../models/repository/device_repository");

const repository = require("../../repository/type_repository");
const deviceRepository = require("../../repository/device_repository");

class TypeService {
  constructor(repository, deviceRepository) {
    this.repository = repository;
    this.deviceRepository = deviceRepository;
  }

  delete = async (deviceUserId, userRole, guid) => {
    try {
      const type = await this.repository.getByGuid(guid);
      if (!type) return { success: false, message: "Type Not Found" };

      let data;
      if (userRole === "admin") {
        data = await this.repository.deleteForAdmin(type.guid);
      } else {
        data = await this.repository.deleteForUser(deviceUserId, type.guid);
      }

      await deviceRepository.deleteByTypeId(type.id);
      return data;
    } catch (error) {
      throw new Error(`Error Delete Type: ${error.message}`);
    }
  };
}

module.exports = new TypeService(repository, deviceRepository);
