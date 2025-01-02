const argon = require("argon2");
// const userRepository = require("../../models/repository/user_repository");
const repository = require("../../repository/user_repository");

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  updateUser = async (guid, name, username, email, password, role) => {
    let hashPassword;

    if (password === "" || password === null) {
      const user = await this.repository.getUserByGuid(guid);
      hashPassword = user.password;
    } else {
      hashPassword = await argon.hash(password);
    }
    try {
      const data = await this.repository.updateUser(guid, name, username, email, hashPassword, role);
      return data;
    } catch (error) {}
  };
}

module.exports = new UserService(repository);
