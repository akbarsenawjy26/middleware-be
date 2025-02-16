// const repository = require("../../models/repository/type_repository");
const repository = require("../../repository/type_repository");

class TypeService {
  constructor(repository) {
    this.repository = repository;
  }

  create = async (deviceUserId, name_type, group) => {
    try {
      const data = await this.repository.create(deviceUserId, name_type, group);

      return data;
    } catch (error) {
      throw new Error(`Error in service layer: ${error.message}`);
    }
  };
}

module.exports = new TypeService(repository);
