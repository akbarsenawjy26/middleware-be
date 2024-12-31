const userRepository = require("../../models/repository/user_repository");
const typeRepository = require("../../models/repository/type_repository");
const tenantRepository = require("../../models/repository/tenant_repository");
const projectRepository = require("../../models/repository/project_repository");
const deviceRepository = require("../../models/repository/device_repository");

class UserService {
  constructor(userRepository, typeRepository, tenantRepository, projectRepository, deviceRepository) {
    this.userRepository = userRepository;
    this.typeRepository = typeRepository;
    this.tenantRepository = tenantRepository;
    this.projectRepository = projectRepository;
    this.deviceRepository = deviceRepository;
  }

  deleteUser = async (guid) => {
    try {
      const user = await userRepository.getUserByGuid(guid);
      if (!user) return { success: false, message: "user Not Found" };

      const data = await this.userRepository.deleteUser(user.guid);
      await typeRepository.deleteByUserId(user.id);
      await tenantRepository.deleteByUserId(user.id);
      await projectRepository.deleteByUserId(user.id);
      await deviceRepository.deleteByUserId(user.id);

      return data;
    } catch (error) {
      throw new Error(`Error Delete Type: ${error.message}`);
    }
  };
}

module.exports = new UserService(userRepository, typeRepository, tenantRepository, projectRepository, deviceRepository);
