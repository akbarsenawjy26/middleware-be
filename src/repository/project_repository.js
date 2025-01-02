const { projects, users, tenants } = require("../../models");
const { Op } = require("sequelize");

class ProjectRepository {
  constructor(projects, users, tenants) {
    this.projects = projects;
    this.users = users;
    this.tenants = tenants;
  }

  create = async (deviceUserId, vendor, version, project_name, identity, tenantId) => {
    return await projects.create({
      vendor: vendor,
      version: version,
      project_name: project_name,
      identity: identity,
      userId: deviceUserId,
      tenantId: tenantId,
    });
  };

  getListForAdmin = async (limit, offset) => {
    return await projects.findAll({
      limit,
      offset,
      where: { status: "active" },
      attributes: ["id", "guid", "vendor", "version", "project_name", "identity", "topic"],
      include: [
        {
          model: this.users,
          attributes: ["name", "email"],
        },
        {
          model: this.tenants,
          attributes: ["id", "name_tenant"],
        },
      ],
    });
  };

  getListForUser = async (deviceUserId, limit, offset) => {
    return await projects.findAll({
      limit,
      offset,
      attributes: ["id", "guid", "vendor", "version", "project_name", "identity", "topic"],
      where: {
        [Op.and]: [{ userId: deviceUserId }, { status: "active" }],
      },
      include: [
        {
          model: this.users,
          attributes: ["name", "email"],
        },
        {
          model: this.tenants,
          attributes: ["id", "name_tenant"],
        },
      ],
    });
  };

  getByGuid = async (guid) => {
    return await projects.findOne({
      where: {
        [Op.and]: [{ guid: guid }, { status: "active" }],
      },
    });
  };

  getByGuidForAdmin = async (guid) => {
    return await projects.findOne({
      where: { guid, status: "active" },
      attributes: ["id", "guid", "vendor", "version", "project_name", "identity", "tenantId", "createdAt", "updatedAt", "topic"],
      include: [
        {
          model: this.users,
          attributes: ["name", "email"],
        },
        {
          model: this.tenants,
          attributes: ["id", "name_tenant", "alias"],
        },
      ],
    });
  };

  getByGuidForUser = async (guid, userId) => {
    return await projects.findAll({
      attributes: ["id", "guid", "vendor", "version", "project_name", "identity", "tenantId", "createdAt", "updatedAt"],
      where: {
        [Op.and]: [{ guid: guid }, { userId: userId }, { status: "active" }],
      },
      include: [
        {
          model: this.users,
          attributes: ["name", "email"],
        },
        {
          model: this.tenants,
          attributes: ["id", "name_tenant", "alias"],
        },
      ],
    });
  };

  deleteByTenantId = async (tenantId) => {
    return await projects.update({ status: "inactive" }, { where: { tenantId: tenantId } });
  };

  deleteByUserId = async (userId) => {
    return projects.update({ status: "inactive" }, { where: { userId: userId } });
  };

  deleteForAdmin = async (guid) => {
    return await projects.update(
      {
        status: "inactive",
      },
      {
        where: { guid },
      }
    );
  };

  deleteForUser = async (guid, deviceUserId) => {
    return await projects.update(
      {
        status: "inactive",
      },
      {
        where: { where: { [Op.and]: [{ guid: guid }, { userId: deviceUserId }] } },
      }
    );
  };

  updateForAdmin = async (guid, vendor, version, project_name, identity, tenantId, topic) => {
    return await projects.update(
      {
        vendor: vendor,
        version: version,
        project_name: project_name,
        identity: identity,
        tenantId: tenantId,
        topic,
      },
      { where: { guid } }
    );
  };

  updateForUser = async (guid, userId, vendor, version, project_name, identity, tenantId, topic) => {
    return await projects.update(
      {
        vendor: vendor,
        version: version,
        project_name: project_name,
        identity: identity,
        tenantId: tenantId,
      },
      { where: { [Op.and]: [{ guid: guid }, { userId: userId }] } }
    );
  };

  getTopicProject = async (projectId) => {
    return await projects.findOne({
      where: { id: projectId },
      attributes: ["status", "topic"],
    });
  };

  getListTopicProject = async () => {
    return await projects.findAll({
      where: { status: "active" },
      attributes: ["topic"],
    });
  };

  countDataAdmin = async () => {
    return await projects.count({
      where: { status: "active" },
    });
  };

  countDataUser = async (deviceUserId) => {
    return await projects.count({
      where: { [Op.and]: [{ deviceUserId }, { status: "active" }] },
    });
  };
}

module.exports = new ProjectRepository(projects, users, tenants);
