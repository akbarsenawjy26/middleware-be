const userRepository = require("../../models/repository/user_repository");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  deleteUser = async (guid) => {
    try {
      const data = await this.userRepository.deleteUser(guid);
      return data;
    } catch (error) {}
  };
}
// const deleteUser = async (guid) => {
//   try {
//     const data = await AuthenticationModel.destroy({
//       where: {
//         guid: guid,
//       },
//     });
//     return data;
//   } catch (error) {}
// };

// module.exports = { deleteUser };
module.exports = new UserService(userRepository);
