const { tenants, users } = require("../../../models");
const { Op } = require("sequelize");

class TenantRepository {
  constructor(tenants, users) {
    this.tenants = tenants;
    this.users = users;
  }

  create = async (deviceUserId, name_tenant, alias) => {
    return await tenants.create({
      name_tenant: name_tenant,
      userId: deviceUserId,
      alias: alias,
    });
  };

  getByGuid = async (guid) => {
    return await tenants.findOne({ where: { guid } });
  };

  getByGuidForAdmin = async (guid) => {
    return await tenants.findOne({
      where: { guid, status: "active" },
      attributes: ["id", "guid", "name_tenant", "userId", "alias"],
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
    return await tenants.findOnne({
      where: {
        [Op.and]: [{ guid }, { userId }, { status: "active" }],
      },
      attributes: ["id", "guid", "name_tenant", "userId", "alias"],
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
    return await tenants.findAll({
      limit,
      offset,
      where: { status: "active" },
      attributes: ["id", "guid", "name_tenant", "userId", "createdAt", "alias"],
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
    return await tenants.findAll({
      limit,
      offset,
      where: {
        [Op.and]: [{ userId: deviceUserId }, { status: "active" }],
      },
      attributes: ["id", "guid", "name_tenant", "userId", "createdAt", "alias"],
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
    return await tenants.update(
      {
        status: "inactive",
      },
      {
        where: { guid },
      }
    );
  };

  deleteByUserId = async (userId) => {
    return tenants.update({ status: "inactive" }, { where: { userId: userId } });
  };

  deleteForUser = async (deviceUserId, guid) => {
    return await tenants.update(
      {
        status: "inactive",
      },
      {
        where: { where: { [Op.and]: [{ guid: guid }, { userId: deviceUserId }] } },
      }
    );
  };

  updateForAdmin = async (guid, name_tenant, alias) => {
    return await tenants.update(
      {
        name_tenant: name_tenant,
        alias: alias,
      },
      {
        where: { guid: guid },
      }
    );
  };

  updateForUser = async (userId, guid, name_tenant, alias) => {
    return await tenants.update(
      {
        name_tenant: name_tenant,
        alias: alias,
      },
      {
        where: { [Op.and]: [{ guid }, { userId }] },
      }
    );
  };

  countDataAdmin = async () => {
    return await tenants.count({
      where: { status: "active" },
    });
  };

  countDataUser = async (deviceUserId) => {
    return await tenants.count({
      where: { [Op.and]: [{ deviceUserId }, { status: "active" }] },
    });
  };
}

module.exports = new TenantRepository(tenants, users);
