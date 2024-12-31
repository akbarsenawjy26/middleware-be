const { devices, users, tenants, projects, types } = require("../../../models");
const { Op } = require("sequelize");

class DeviceRepository {
  constructor(devices, users, tenants, projects, types) {
    this.devices = devices;
    this.users = users;
    this.tenants = tenants;
    this.projects = projects;
    this.types = types;
  }

  create = async (device_sn, device_name, device_location, projectId, deviceUserId, tenantId, typeId, group) => {
    return await devices.create({
      device_sn: device_sn,
      device_name: device_name,
      device_location: device_location,
      userId: deviceUserId,
      tenantId: tenantId,
      projectId: projectId,
      typeId: typeId,
      filter: group,
    });
  };

  getByGuid = async (guid) => {
    return await devices.findOne({
      where: {
        [Op.and]: [{ guid: guid }, { status: "active" }],
      },
    });
  };

  getByProjectId = async (projectId) => {
    return await devices.findAll({
      where: {
        [Op.and]: [{ projectId: projectId }, { status: "active" }],
      },
    });
  };

  getByGuidForAdmin = async (guid) => {
    return await devices.findOne({
      where: {
        [Op.and]: [{ guid: guid }, { status: "active" }],
      },
      attributes: ["guid", "device_sn", "device_name", "device_location", "projectId", "tenantId", "typeId", "filter"],
      include: [
        {
          model: this.users,
          attributes: ["name", "email"],
        },
        {
          model: this.projects,
          attributes: ["guid", "project_name", "vendor", "identity"],
        },
        {
          model: this.tenants,
          attributes: ["name_tenant", "alias"],
        },
        {
          model: this.types,
          attributes: ["name_type"],
        },
      ],
    });
  };

  getByGuidForUser = async (guid, userId) => {
    return await devices.findAll({
      attributes: ["guid", "device_sn", "device_name", "device_location", "projectId", "tenantId", "typeId", "filter"],
      where: {
        [Op.and]: [{ guid: guid }, { userId: userId }, { status: "active" }],
      },
      include: [
        {
          model: this.users,
          attributes: ["name", "email"],
        },
        {
          model: this.projects,
          attributes: ["project_name"],
        },
        {
          model: this.tenants,
          attributes: ["name_tenant"],
        },
        {
          model: this.types,
          attributes: ["name_type"],
        },
      ],
    });
  };

  getListForAdmin = async (limit, offset) => {
    return await devices.findAll({
      limit,
      offset,
      where: { status: "active" },
      attributes: ["guid", "device_sn", "device_name", "device_location", "projectId", "tenantId", "typeId", "filter"],
      include: [
        {
          model: this.users,
          attributes: ["name", "email"],
        },
        {
          model: this.projects,
          attributes: ["project_name"],
        },
        {
          model: this.tenants,
          attributes: ["name_tenant"],
        },
        {
          model: this.types,
          attributes: ["name_type"],
        },
      ],
    });
  };

  getListForUser = async (deviceUserId, limit, offset) => {
    return await devices.findAll({
      limit,
      offset,
      attributes: ["guid", "device_sn", "device_name", "device_location", "projectId", "tenantId", "typeId"],
      where: {
        [Op.and]: [{ userId: deviceUserId }, { status: "active" }],
      },
      include: [
        {
          model: this.users,
          attributes: ["name", "email"],
        },
        {
          model: this.projects,
          attributes: ["project_name"],
        },
        {
          model: this.tenants,
          attributes: ["name_tenant"],
        },
        {
          model: this.types,
          attributes: ["name_type"],
        },
      ],
    });
  };

  deleteByProjectId = async (projectId) => {
    return await devices.update({ status: "inactive" }, { where: { projectId: projectId } });
  };

  deleteByTypeId = async (typeId) => {
    return await devices.update({ status: "inactive" }, { where: { typeId: typeId } });
  };

  deleteByTenantId = async (tenantId) => {
    return await devices.update({ status: "inactive" }, { where: { tenantId: tenantId } });
  };

  deleteByUserId = async (userId) => {
    return devices.update({ status: "inactive" }, { where: { userId: userId } });
  };

  deleteForAdmin = async (guid) => {
    return await devices.update({ status: "inactive" }, { where: { guid } });
  };

  deleteForUser = async (guid, deviceUserId) => {
    return await devices.update({ status: "inactive" }, { where: { [Op.and]: [{ guid: guid }, { userId: deviceUserId }] } });
  };

  updateForAdmin = async (guid, device_sn, device_name, device_location, projectId, tenantId, typeId, group) => {
    return await devices.update(
      {
        device_sn: device_sn,
        device_name: device_name,
        device_location: device_location,
        tenantId: tenantId,
        projectId: projectId,
        typeId: typeId,
        filter: group,
      },
      { where: { guid } }
    );
  };

  updateForUser = async (guid, userId, device_sn, device_name, device_location, projectId, tenantId, typeId, group) => {
    return await devices.update(
      {
        device_sn: device_sn,
        device_name: device_name,
        device_location: device_location,
        tenantId: tenantId,
        projectId: projectId,
        typeId: typeId,
        filter: group,
      },
      { where: { [Op.and]: [{ guid: guid }, { userId: userId }] } }
    );
  };

  countDataAdmin = async () => {
    return await devices.count({
      where: { status: "active" },
    });
  };

  countDataUser = async (deviceUserId) => {
    return await devices.count({
      where: { [Op.and]: [{ userId: deviceUserId }, { status: "active" }] },
    });
  };
}

module.exports = new DeviceRepository(devices, users, tenants, projects, types);
