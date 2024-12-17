const { types, users } = require("../../../models");
const { Op } = require("sequelize");

class TypeRepository {
  constructor(types, users) {
    this.types = types;
    this.users = users;
  }

  create = async (deviceUserId, name_type) => {
    return await types.create({
      name_type: name_type,
      userId: deviceUserId,
    });
  };

  getByGuid = async (guid) => {
    return await types.findOne({
      where: {
        [Op.and]: [{ guid: guid }, { status: "active" }],
      },
    });
  };

  getByGuidForAdmin = async (guid) => {
    return await types.findOne({
      where: { guid, status: "active" },
      attributes: ["id", "guid", "name_type", "userId"],
      include: [
        {
          model: this.users,
          as: "user",
          attributes: ["id", "name"],
        },
      ],
    });
  };

  getByGuidForUser = async (guid, userId) => {
    return await types.findOnne({
      where: {
        [Op.and]: [{ guid }, { userId }, { status: "active" }],
      },
      attributes: ["id", "guid", "name_type", "userId"],
      include: [
        {
          model: this.users,
          as: "user",
          attributes: ["id", "name"],
        },
      ],
    });
  };

  getListForAdmin = async (limit, offset) => {
    return await types.findAll({
      limit,
      offset,
      where: { status: "active" },
      attributes: ["id", "guid", "name_type", "userId"],
      include: [
        {
          model: this.users,
          as: "user",
          attributes: ["id", "name"],
        },
      ],
    });
  };

  getListForUser = async (deviceUserId, limit, offset) => {
    return await types.findAll({
      limit,
      offset,
      where: {
        [Op.and]: [{ userId: deviceUserId }, { status: "active" }],
      },
      attributes: ["id", "guid", "name_type", "userId"],
      include: [
        {
          model: this.users,
          as: "user",
          attributes: ["id", "name"],
        },
      ],
    });
  };

  deleteForAdmin = async (guid) => {
    return await types.update(
      {
        status: "inactive",
      },
      {
        where: { guid },
      }
    );
  };

  deleteForUser = async (deviceUserId, guid) => {
    return await types.update(
      {
        status: "inactive",
      },
      {
        where: { where: { [Op.and]: [{ guid: guid }, { userId: deviceUserId }] } },
      }
    );
  };

  updateForAdmin = async (guid, name_type) => {
    return await types.update(
      {
        name_type: name_type,
      },
      {
        where: { guid: guid },
      }
    );
  };

  updateForUser = async (userId, guid, name_type) => {
    return await types.update(
      {
        name_type: name_type,
      },
      {
        where: { [Op.and]: [{ guid }, { userId }] },
      }
    );
  };

  countDataAdmin = async () => {
    return await types.count({
      where: { status: "active" },
    });
  };

  countDataUser = async (deviceUserId) => {
    return await types.count({
      where: { [Op.and]: [{ deviceUserId }, { status: "active" }] },
    });
  };
}

module.exports = new TypeRepository(types, users);
