const argon = require("argon2");
// const userRepository = require("../../models/repository/user_repository");
const repository = require("../../repository/user_repository");

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  createUser = async (name, username, email, password, role) => {
    const hashPassword = await argon.hash(password);

    const data = await this.repository.createUser(name, username, email, hashPassword, role);

    return data;
  };
}

module.exports = new UserService(repository);
