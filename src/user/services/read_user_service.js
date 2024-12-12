const userRepository = require("../../models/repository/user_repository");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  getUserList = async (size, page) => {
    try {
      const limit = size ? parseInt(size) : 10;
      const offset = page ? (parseInt(page) - 1) * limit : 0;

      let data, totalData;
      totalData = await this.userRepository.countData();
      data = await this.userRepository.getUserList(limit, offset);

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
      const data = await this.userRepository.getUserByGuid(guid);
      return data;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  };

  getUserByEmail = async (email) => {
    try {
      const data = await this.userRepository.getUserByEmail(email);
      return data;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  };

  getUserBySessionGuid = async (sessionGuid) => {
    try {
      const data = await this.userRepository.getUserBySessionGuid(sessionGuid);

      return data;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  };
}

// const getUserList = async () => {
//   try {
//     const data = await AuthenticationModel.findAll();
//     return data;
//   } catch (error) {
//     throw new Error(`Error fetching users: ${error.message}`);
//   }
// };

// const getUserByGuid = async (guid) => {
//   try {
//     const data = await AuthenticationModel.findOne({
//       where: {
//         guid,
//       },
//     });
//     return data;
//   } catch (error) {
//     throw new Error(`Error fetching users: ${error.message}`);
//   }
// };

// const getUserByEmail = async (email) => {
//   try {
//     const data = await AuthenticationModel.findOne({
//       where: {
//         email: email,
//       },
//     });
//     return data;
//   } catch (error) {
//     throw new Error(`Error fetching users: ${error.message}`);
//   }
// };

// const getUserBySessionGuid = async (sessionGuid) => {
//   try {
//     const data = await AuthenticationModel.findOne({
//       attributes: ["id", "guid", "name", "username", "email", "role"],
//       where: {
//         guid: sessionGuid,
//       },
//     });
//     return data;
//   } catch (error) {
//     throw new Error(`Error fetching users: ${error.message}`);
//   }
// };

// module.exports = { getUserList, getUserByGuid, getUserByEmail, getUserBySessionGuid };
module.exports = new UserService(userRepository);
