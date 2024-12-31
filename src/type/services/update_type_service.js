const repository = require("../../models/repository/type_repository");

class TypeService {
  constructor(repository) {
    this.repository = repository;
  }

  update = async (userId, userRole, guid, name_type, group) => {
    try {
      const tenant = await this.repository.getByGuid(guid);
      if (!tenant) return { success: false, message: "Type Not Found" };

      let data;
      if (userRole === "admin") {
        data = await this.repository.updateForAdmin(guid, name_type, group);
      } else {
        data = await this.repository.updateForUser(userId, guid, name_type, group);
      }

      return data;
    } catch (error) {
      throw new Error(`Error Updating Type: ${error.message}`);
    }
  };
}

module.exports = new TypeService(repository);
