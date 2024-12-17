const { devices, users, tenants, projects, types } = require("../../../models");
const { Op, where } = require("sequelize");

class DeviceRepository {
  constructor(devices, users, tenants, projects, types) {
    this.devices = devices;
    this.users = users;
    this.tenants = tenants;
    this.projects = projects;
    this.types = types;
  }

  create = async (device_sn, device_name, device_location, projectId, deviceUserId, tenantId, typeId) => {
    return await devices.create({
      device_sn: device_sn,
      device_name: device_name,
      device_location: device_location,
      userId: deviceUserId,
      tenantId: tenantId,
      projectId: projectId,
      typeId: typeId,
    });
  };

  getByGuid = async (guid) => {
    return await devices.findOne({
      where: {
        [Op.and]: [{ guid: guid }, { status: "active" }],
      },
    });
  };

  getByGuidForAdmin = async (guid) => {
    return await devices.findOne({
      where: {
        [Op.and]: [{ guid: guid }, { status: "active" }],
      },
      attributes: ["guid", "device_sn", "device_name", "device_location", "projectId", "tenantId", "typeId"],
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

  getByGuidForUser = async (guid, userId) => {
    return await devices.findAll({
      attributes: ["guid", "device_sn", "device_name", "device_location", "projectId", "tenantId", "typeId"],
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
      attributes: ["guid", "device_sn", "device_name", "device_location", "projectId", "tenantId", "typeId"],
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

  deleteForAdmin = async (guid) => {
    return await devices.update({ status: "inactive" }, { where: { guid } });
  };

  deleteForUser = async (guid, deviceUserId) => {
    return await devices.update({ status: "inactive" }, { where: { [Op.and]: [{ guid: guid }, { userId: deviceUserId }] } });
  };

  updateForAdmin = async (guid, device_sn, device_name, device_location, projectId, tenantId, typeId) => {
    return await devices.update(
      {
        device_sn: device_sn,
        device_name: device_name,
        device_location: device_location,
        tenantId: tenantId,
        projectId: projectId,
        typeId: typeId,
      },
      { where: { guid } }
    );
  };

  updateForUser = async (guid, userId, device_sn, device_name, device_location, projectId, tenantId, typeId) => {
    return await devices.update(
      {
        device_sn: device_sn,
        device_name: device_name,
        device_location: device_location,
        tenantId: tenantId,
        projectId: projectId,
        typeId: typeId,
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
