const { users } = require("../../models");

class UserRepository {
  constructor(users) {
    this.users = users;
  }

  createUser = async (name, username, email, hashPassword, role) => {
    return await users.create({
      name: name,
      username: username,
      email: email,
      password: hashPassword,
      role: role,
    });
  };

  deleteUser = async (guid) => {
    return await users.destroy({
      where: {
        guid: guid,
      },
    });
  };

  getUserList = async (limit, offset) => {
    return await users.findAll({
      limit,
      offset,
    });
  };

  getUserByGuid = async (guid) => {
    return await users.findOne({
      where: {
        guid,
      },
    });
  };

  getUserByEmail = async (email) => {
    return await users.findOne({
      where: {
        email: email,
      },
    });
  };

  getUserBySessionGuid = async (sessionGuid) => {
    return await users.findOne({
      attributes: ["id", "guid", "name", "username", "email", "role"],
      where: {
        guid: sessionGuid,
      },
    });
  };

  updateUser = async (guid, name, username, email, hashPassword, role) => {
    return await users.update(
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
    return await users.count();
  };
}

module.exports = new UserRepository(users);
