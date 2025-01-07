// const userRepository = require("../../models/repository/user_repository");
const repository = require("../../repository/user_repository");

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  getUserList = async (size, page) => {
    try {
      const limit = size ? parseInt(size) : 10;
      const offset = page ? (parseInt(page) - 1) * limit : 0;

      let data, totalData;
      totalData = await this.repository.countData();
      data = await this.repository.getUserList(limit, offset);

      return {
        totalItems: totalData,
        currentPage: page ? parseInt(page) : 1,
        totalPages: Math.ceil(totalData / limit),
        data,
      };
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  };

  getUserByGuid = async (guid) => {
    try {
      const data = await this.repository.getUserByGuid(guid);
      return data;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  };

  getUserByEmail = async (email) => {
    try {
      const data = await this.repository.getUserByEmail(email);
      return data;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  };

  getUserBySessionGuid = async (sessionGuid) => {
    try {
      const data = await this.repository.getUserBySessionGuid(sessionGuid);

      return data;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  };
}

module.exports = new UserService(repository);
