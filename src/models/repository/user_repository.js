const userModels = require("../user_models");

class UserRepository {
  constructor(userModels) {
    this.userModels = userModels;
  }

  createUser = async (name, username, email, hashPassword, role) => {
    return await userModels.create({
      name: name,
      username: username,
      email: email,
      password: hashPassword,
      role: role,
    });
  };

  deleteUser = async (guid) => {
    return await userModels.destroy({
      where: {
        guid: guid,
      },
    });
  };

  getUserList = async (limit, offset) => {
    return await userModels.findAll({
      limit,
      offset,
    });
  };

  getUserByGuid = async (guid) => {
    return await userModels.findOne({
      where: {
        guid,
      },
    });
  };

  getUserByEmail = async (email) => {
    return await userModels.findOne({
      where: {
        email: email,
      },
    });
  };

  getUserBySessionGuid = async (sessionGuid) => {
    return await userModels.findOne({
      attributes: ["id", "guid", "name", "username", "email", "role"],
      where: {
        guid: sessionGuid,
      },
    });
  };

  updateUser = async (guid, name, username, email, hashPassword, role) => {
    return await userModels.update(
      {
        name: name,
        username: username,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          guid: guid,
        },
      }
    );
  };

  countData = async () => {
    return await userModels.count();
  };
}

module.exports = new UserRepository(userModels);
