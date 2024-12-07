const argon = require("argon2");
const userRepository = require("../../models/repository/user_repository");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  createUser = async (name, username, email, password, role) => {
    const hashPassword = await argon.hash(password);

    const data = await this.userRepository.createUser(name, username, email, hashPassword, role);

    return data;
  };
}
// const createUser = async (name, username, email, password, role) => {
//   const hashPassword = await argon.hash(password);

//   const data = await userModels.create({
//     name: name,
//     username: username,
//     email: email,
//     password: hashPassword,
//     role: role,
//   });

//   return data;
// };

// module.exports = { createUser };
module.exports = new UserService(userRepository);
